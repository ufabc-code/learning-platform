import FinishModuleCongratulation from 'components/student/courses/[courseId]/modules/[moduleId]/finishModuleCongratulation'
import ProgressBar from 'components/progressBar'
import Spinner from 'components/spinner'
import useLessonStatistics from 'hooks/useLessonStatistics'
import { useRouter } from 'next/router'
import CodeLesson from 'server/entities/codeLesson'
import QuizLesson from 'server/entities/quizLesson'
import { CodeVisualizer } from './components/codeVisualizer'
import { QuizVisualizer } from './components/quizVisualizer'

function ModuleVisualizer() {
  const router = useRouter()
  const { courseId = '', moduleId = '' } = router.query as {
    courseId: string
    moduleId: string
  }

  const {
    handleEvaluateAnswer,
    lessonToDo,
    examRunning,
    numberOfLessons,
    remainingLessons,
    savingAnswers,
  } = useLessonStatistics({
    courseId: courseId,
    moduleId: moduleId,
  })

  if (!examRunning) {
    return <div>loading exam</div>
  }

  if (!lessonToDo) {
    return (
      <FinishModuleCongratulation loading={savingAnswers} courseId={courseId} />
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
