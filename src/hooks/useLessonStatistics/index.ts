import { useEffect, useRef, useState } from 'react'
import Lesson from 'server/entities/lesson'
import Module from 'server/entities/module'
import { trpc } from 'utils/trpc'

type UseLessonStatisticsProps = { courseId: string; moduleId: string }

const useLessonStatistics = ({
  courseId,
  moduleId,
}: UseLessonStatisticsProps) => {
  const { data } = trpc.useQuery(['courses.get', { id: courseId }])
  const { mutate: evaluateModule } = trpc.useMutation('evaluateModule.evaluate')
  const { mutate: evaluateLesson } = trpc.useMutation('evaluateLesson.evaluate')
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [examRunning, setExamRunning] = useState(false)
  const [numberOfLessons, setNumberOfLessons] = useState(0)
  const [savingAnswers, setSavingAnswers] = useState(false)

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

        const lessonsToRemember = await trpc.useContext().client.query(
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
  }, [courseId, moduleId, data, lessons.length, examRunning])

  // save answer
  useEffect(() => {
    if (lessons.length === 0 && examRunning) {
      const statisticsArr = Object.entries(statistics.current).map(
        ([lessonId, { attempts, answer }]) => {
          return {
            attempts,
            answer: { courseId, moduleId, lessonId, answer },
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
  }, [courseId, evaluateModule, examRunning, lessons.length, moduleId])

  const handleEvaluateAnswer = (
    answer: { code: string; language: string } | { alternatives: number[] },
  ) => {
    const firstElement = lessons[0]

    if (lessons && firstElement?.id) {
      evaluateLesson(
        { courseId, moduleId, lessonId: firstElement.id, answer },
        {
          onSuccess(data) {
            statistics.current[firstElement.id] = {
              attempts:
                Number(statistics.current[firstElement.id]?.attempts || 0) + 1,
              answer,
            }

            console.log(statistics.current)

            if (!data.correct) {
              lessons.push(firstElement)
            }
            lessons.shift()
            setLessons([...lessons])
          },
          onError() {
            lessons.shift()
            setLessons([...lessons])
          },
        },
      )
    }
  }

  return {
    handleEvaluateAnswer,
    lessonToDo: lessons[0],
    examRunning,
    remainingLessons: lessons.length,
    numberOfLessons,
    savingAnswers,
  }
}

export default useLessonStatistics
