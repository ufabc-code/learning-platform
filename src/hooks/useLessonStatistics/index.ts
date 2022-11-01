import { useRef } from 'react'
import { CodeUserAnswer } from 'server/entities/codeUserAnswer'
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

  const { lessons } =
    data?.modules.find((module) => module.id === moduleId) || {}

  const statistics = useRef<
    Record<
      string,
      { attempts: number; answer: CodeUserAnswer | QuizUserAnswer }
    >
  >({})

  const handleEvaluateAnswer = (answer: CodeUserAnswer | QuizUserAnswer) => {
    const firstElement = lessons?.shift()
    if (lessons && firstElement?.id) {
      evaluateLesson(
        { courseId, moduleId, lessonId: firstElement.id, answer },
        {
          onSuccess(data) {
            lessons.push(firstElement)
            statistics.current[firstElement.id] = {
              attempts:
                Number(statistics.current[firstElement.id]?.attempts || 0) + 1,
              answer,
            }
            if (!data.correct) {
              lessons.push(firstElement)
            }
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

  return { handleEvaluateAnswer, handleSaveAnswers, lesson: lessons?.[0] }
}

export default useLessonStatistics
