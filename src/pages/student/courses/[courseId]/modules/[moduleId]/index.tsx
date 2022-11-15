import ProgressBar from 'components/student/courses/[courseId]/modules/[moduleId]/components/ProgressBar'
import Spinner from 'components/student/courses/[courseId]/modules/[moduleId]/components/Spinner'
import useLessonStatistics from 'hooks/useLessonStatistics'
import { useRouter } from 'next/router'
import CodeLesson from 'server/entities/codeLesson'
import QuizLesson from 'server/entities/quizLesson'
import { CodeVisualizer } from './components/codeVisualizer'
import { QuizVisualizer } from './components/quizVisualizer'

function ModuleVisualizer() {
  const router = useRouter()
  const { courseId, moduleId } = router.query

  const {
    handleEvaluateAnswer,
    lessonToDo,
    examRunning,
    numberOfLessons,
    remainingLessons,
    savingAnswers,
  } = useLessonStatistics({
    courseId: (courseId as string) || '',
    moduleId: (moduleId as string) || '',
  })

  if (!examRunning) {
    return <div>loading exam</div>
  }

  if (!lessonToDo) {
    return (
      <div>
        <h1>Parbéns você completou este módulo</h1>

        {savingAnswers && (
          <div>
            <h3 className="text-xl">Estamos salvando suas respostas</h3>
            <Spinner />
          </div>
        )}

        <button
          type="button"
          className={`rounded-lg px-5 py-2.5  text-center text-sm font-medium text-white ${
            savingAnswers
              ? 'cursor-not-allowed bg-blue-200'
              : 'bg-blue-700 hover:bg-blue-800 '
          }`}
          disabled={savingAnswers}
          onClick={() => {
            router.push(`/student/courses/${courseId}`)
          }}
        >
          Ir para home
        </button>
      </div>
    )
  }

  return (
    <div className="p-8">
      <ProgressBar
        progress={Math.floor(
          ((numberOfLessons - remainingLessons) / numberOfLessons) * 100,
        )}
      />
      <div>
        {lessonToDo.type === 'code' && (
          <CodeVisualizer
            codeLesson={lessonToDo as CodeLesson}
            handleEvaluateAnswer={(answer: {
              code: string
              language: string
            }) => {
              handleEvaluateAnswer(answer)
            }}
          />
        )}
        {lessonToDo.type === 'quiz' && (
          <QuizVisualizer
            quizLesson={lessonToDo as QuizLesson}
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
