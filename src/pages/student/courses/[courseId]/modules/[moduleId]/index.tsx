import useLessonStatistics from 'hooks/useLessonStatistics'
import { useRouter } from 'next/router'
import CodeLesson from 'server/entities/codeLesson'
import { CodeUserAnswer } from 'server/entities/codeUserAnswer'
import QuizLesson from 'server/entities/quizLesson'
import { QuizUserAnswer } from 'server/entities/quizUserAnswer'
import { trpc } from 'utils/trpc'
import { CodeVisualizer } from './components/codeVisualizer'
import { QuizVisualizer } from './components/quizVisualizer'

function ModuleVisualizer() {
  const router = useRouter()
  const { courseId, moduleId } = router.query
  const courseQuery = trpc.useQuery(['courses.get', { id: courseId as string }])
  const course = courseQuery.data

  const { handleEvaluateAnswer, lessons } = useLessonStatistics({
    courseId: (courseId as string) || '',
    moduleId: (moduleId as string) || '',
  })

  if (!course) return null

  const currentModule = course.modules.find(({ id }) => id === moduleId)

  if (!currentModule) return null

  if (!lessons[0]) {
    return <div>acabou</div>
  }

  return (
    <div>
      <h1>ModuleVisualizer</h1>
      <div className="borde-blue-500 border-2">
        {lessons[0]!.type === 'code' && (
          <CodeVisualizer
            codeLesson={lessons[0] as CodeLesson}
            handleEvaluateAnswer={(answer: CodeUserAnswer | QuizUserAnswer) => {
              handleEvaluateAnswer(answer)
            }}
          />
        )}
        {lessons[0]!.type === 'quiz' && (
          <QuizVisualizer
            quizLesson={lessons[0] as QuizLesson}
            handleEvaluateAnswer={(answer: CodeUserAnswer | QuizUserAnswer) => {
              handleEvaluateAnswer(answer)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default ModuleVisualizer
