import FinishModuleCongratulation from 'components/student/courses/[courseId]/modules/[moduleId]/finishModuleCongratulation'
import ProgressBar from 'components/progressBar'
import useLessonStatistics from 'hooks/useLessonStatistics'
import { useRouter } from 'next/router'
import CodeLesson from 'server/entities/codeLesson'
import QuizLesson from 'server/entities/quizLesson'
import { QuizVisualizer } from 'components/lessonVisualizer/quizVisualizer'
import { CodeVisualizer } from 'components/lessonVisualizer/codeVisualizer'
import Spinner from 'components/spinner'
import Container from 'components/container'
import Header from 'components/header'

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
    markQuestionAsSolved,
    markQuestionAsUnsolved,
    error,
  } = useLessonStatistics({
    courseId: courseId,
    moduleId: moduleId,
  })

  if (error) {
    throw error
  }

  if (!examRunning) {
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-y-1/2 -translate-x-1/2 flex-col items-center justify-center">
        <span className="mb-4 text-3xl text-flowbite-blue">Carregando...</span>
        <Spinner />
      </div>
    )
  }

  if (!lessonToDo) {
    return (
      <FinishModuleCongratulation loading={savingAnswers} courseId={courseId} />
    )
  }

  async function handleEvaluateQuizAnswer(answer: {
    alternatives: number[]
  }): Promise<boolean> {
    return await handleEvaluateAnswer(answer)
  }

  async function handleEvaluateCodeAnswer(answer: {
    code: string
    language: string
  }): Promise<boolean> {
    return await handleEvaluateAnswer(answer)
  }

  return (
    <>
      <Header />
      <Container>
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
                handleEvaluateAnswer={handleEvaluateCodeAnswer}
                markQuestionAsSolved={markQuestionAsSolved}
                markQuestionAsUnsolved={markQuestionAsUnsolved}
              />
            )}
            {lessonToDo.type === 'quiz' && (
              <QuizVisualizer
                quizLesson={lessonToDo as QuizLesson}
                handleEvaluateAnswer={handleEvaluateQuizAnswer}
                markQuestionAsSolved={markQuestionAsSolved}
                markQuestionAsUnsolved={markQuestionAsUnsolved}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export default ModuleVisualizer
