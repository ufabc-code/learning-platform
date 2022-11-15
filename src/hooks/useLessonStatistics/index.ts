import { useEffect, useRef, useState } from 'react'
import { CodeUserAnswer } from 'server/entities/codeUserAnswer'
import Lesson from 'server/entities/lesson'
import { QuizUserAnswer } from 'server/entities/quizUserAnswer'
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
  const [flag, setFlag] = useState(false) // to prevent bug at useEffect

  const statistics = useRef<
    Record<
      string,
      { attempts: number; answer: CodeUserAnswer | QuizUserAnswer }
    >
  >({})

  useEffect(() => {
    if (data && lessons.length === 0 && !flag) {
      setFlag(true)

      const { modules } = data
      setLessons(
        modules.find((module) => module.id === moduleId)?.lessons || [],
      )
    }
  }, [courseId, moduleId, data])


  const handleEvaluateAnswer = (answer: CodeUserAnswer | QuizUserAnswer) => {
    const firstElement = lessons?.shift()

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
            if (!data.correct) {
              lessons.push(firstElement)
            }
            setLessons([...lessons])
          },
          onError() {
            setLessons([...lessons])
          },
        },
      )
    }
  }

  const handleSaveAnswers = () => {
    const statisticsArr = Object.entries(statistics.current).map(
      ([lessonId, { attempts, answer }]) => {
        return { attempts, answer: { courseId, moduleId, lessonId, answer } }
      },
    )
    evaluateModule(statisticsArr)
  }

  return { handleEvaluateAnswer, handleSaveAnswers, lessons }
}

export default useLessonStatistics
