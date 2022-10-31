import { useRouter } from 'next/router'
import { useState } from 'react'
import CodeLesson from 'server/entities/codeLesson'
import QuizLesson from 'server/entities/quizLesson'
import { trpc } from 'utils/trpc'
import { CodeVisualizer } from './components/codeVisualizer'
import { QuizVisualizer } from './components/quizVisualizer'

function ModuleVisualizer() {
  const router = useRouter()
  const { courseId, moduleId } = router.query
  const [type, setType] = useState('quiz')
  const courseQuery = trpc.useQuery(['courses.get', { id: courseId as string }])
  const course = courseQuery.data

  if (!course) return null

  const currentModule = course.modules.find(({ id }) => id === moduleId)

  if (!currentModule) return null

  return (
    <div>
      <h1>ModuleVisualizer</h1>
      <div className="borde-blue-500 border-2">
        {type === 'code' && (
          <CodeVisualizer codeLesson={currentModule.lessons[0] as CodeLesson} />
        )}
        {type === 'quiz' && (
          <QuizVisualizer quizLesson={currentModule.lessons[1] as QuizLesson} />
        )}
      </div>
    </div>
  )
}

export default ModuleVisualizer