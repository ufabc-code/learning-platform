import { useCallback, useEffect, useRef, useState } from 'react'
import Lesson from 'server/entities/lesson'
import Module from 'server/entities/module'
import { trpc } from 'utils/trpc'

type UseLessonStatisticsProps = { courseId: string; moduleId: string }

const useLessonStatistics = ({
  courseId,
  moduleId,
}: UseLessonStatisticsProps) => {
  const { data } = trpc.useQuery(['courses.get', { id: courseId }], {
    useErrorBoundary: true,
  })
  const { mutate: evaluateModule } = trpc.useMutation(
    'evaluateModule.evaluate',
    { useErrorBoundary: true },
  )
  const { mutate: evaluateLesson } = trpc.useMutation(
    'evaluateLesson.evaluate',
    { useErrorBoundary: true },
  )
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [examRunning, setExamRunning] = useState(false)
  const [numberOfLessons, setNumberOfLessons] = useState(0)
  const [savingAnswers, setSavingAnswers] = useState(false)
  const trpcClient = trpc.useContext().client

  const getModuleId = useCallback(
    (lessonId: string) => {
      for (const m of data?.modules || []) {
        for (const lesson of m.lessons) {
          if (lesson.id === lessonId) {
            return m.id
          }
        }
      }
      throw new Error('Could not find module id')
    },
    [data?.modules],
  )

  const statistics = useRef<
    Record<
      string,
      {
        attempts: number
        answer: { code: string; language: string } | { alternatives: number[] }
      }
    >
  >({})

  function getLessonsToRemember(
    lessonsToRemember: {
      courseId: string
      lessonId: string
      moduleId: string
    }[],
    modules: Module[],
  ) {
    const lessons = []
    for (const lessonToRemember of lessonsToRemember) {
      const currentModule = modules.find(
        ({ id }) => id === lessonToRemember.moduleId,
      )
      if (currentModule) {
        const lesson = currentModule.lessons.find(
          (lesson) => lesson.id === lessonToRemember.lessonId,
        )
        if (lesson) {
          lessons.push(lesson)
        }
      }
    }
    return lessons
  }

  useEffect(() => {
    async function fetchLessons() {
      if (data && lessons.length === 0 && !examRunning) {
        const { modules } = data
        const lessons = modules.find(({ id }) => id === moduleId)?.lessons || []

        const lessonsToRemember = await trpcClient.query(
          'lessonsToRemember.get',
          {
            courseId,
          },
        )

        const lessonsToDo = [
          ...getLessonsToRemember(lessonsToRemember, modules),
          ...lessons,
        ]

        setLessons(lessonsToDo)
        setNumberOfLessons(lessonsToDo.length)
        setExamRunning(true)
      }
    }
    fetchLessons()
  }, [courseId, moduleId, data, lessons.length, examRunning, trpcClient])

  // save answer
  useEffect(() => {
    if (lessons.length === 0 && examRunning) {
      const statisticsArr = Object.entries(statistics.current).map(
        ([lessonId, { attempts, answer }]) => {
          return {
            attempts,
            answer: {
              courseId,
              moduleId: getModuleId(lessonId),
              lessonId,
              answer,
            },
          }
        },
      )
      setSavingAnswers(true)
      evaluateModule(statisticsArr, {
        onSuccess: () => {
          setSavingAnswers(false)
        },
      })
    }
  }, [
    courseId,
    evaluateModule,
    examRunning,
    getModuleId,
    lessons.length,
    moduleId,
  ])

  const handleEvaluateAnswer = (
    answer: { code: string; language: string } | { alternatives: number[] },
  ): Promise<boolean> => {
    const firstElement = lessons[0]

    if (lessons && firstElement?.id) {
      return new Promise((resolve, reject) => {
        evaluateLesson(
          {
            courseId,
            moduleId: getModuleId(firstElement.id),
            lessonId: firstElement.id,
            answer,
          },
          {
            onSuccess(data) {
              statistics.current[firstElement.id] = {
                attempts:
                  Number(statistics.current[firstElement.id]?.attempts || 0) +
                  1,
                answer,
              }
              resolve(data.correct)
            },
            onError() {
              reject()
            },
          },
        )
      })
    } else {
      return Promise.reject()
    }
  }

  const markQuestionAsSolved = () => {
    lessons.shift()
    setLessons([...lessons])
  }

  const markQuestionAsUnsolved = () => {
    const firstElement = lessons[0]
    if (firstElement) {
      lessons.push(firstElement)
      lessons.shift()
      setLessons([...lessons])
    }
  }

  return {
    handleEvaluateAnswer,
    lessonToDo: lessons[0],
    examRunning,
    remainingLessons: lessons.length,
    numberOfLessons,
    savingAnswers,
    markQuestionAsSolved,
    markQuestionAsUnsolved,
  }
}

export default useLessonStatistics
