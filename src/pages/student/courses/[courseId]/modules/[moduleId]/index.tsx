import useLessonStatistics from 'hooks/useLessonStatistics'
import { useRouter } from 'next/router'
import CodeLesson from 'server/entities/codeLesson'
import QuizLesson from 'server/entities/quizLesson'
import { trpc } from 'utils/trpc'
import { CodeVisualizer } from './components/codeVisualizer'
import { QuizVisualizer } from './components/quizVisualizer'

function ModuleVisualizer() {
  const router = useRouter()
  const { courseId, moduleId } = router.query
  const courseQuery = trpc.useQuery(['courses.get', { id: courseId as string }])
  const course = courseQuery.data

  const { handleEvaluateAnswer, lesson } = useLessonStatistics({
    courseId: (courseId as string) || '',
    moduleId: (moduleId as string) || '',
  })

  if (!course) return null

  const currentModule = course.modules.find(({ id }) => id === moduleId)

  if (!currentModule) return null

  if (!lesson) {
    return <div>acabou</div>
  }

  return (
    <div>
      <h1>ModuleVisualizer</h1>
      <div className="borde-blue-500 border-2">
        {lesson.type === 'code' && (
          <CodeVisualizer
            codeLesson={lesson as CodeLesson}
            handleEvaluateAnswer={(answer: {
              code: string
              language: string
            }) => {
              handleEvaluateAnswer(answer)
            }}
          />
        )}
        {lesson.type === 'quiz' && (
          <QuizVisualizer
            quizLesson={lesson as QuizLesson}
            handleEvaluateAnswer={(answer: { alternatives: number[] }) => {
              handleEvaluateAnswer(answer)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default ModuleVisualizer
