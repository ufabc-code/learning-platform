import FinishModuleCongratulation from 'components/student/courses/[courseId]/modules/[moduleId]/finishModuleCongratulation'
import ProgressBar from 'components/progressBar'
import useLessonStatistics from 'hooks/useLessonStatistics'
import { useRouter } from 'next/router'
import CodeLesson from 'server/entities/codeLesson'
import QuizLesson from 'server/entities/quizLesson'
import { QuizVisualizer } from 'components/student/courses/[courseId]/modules/[moduleId]/quizVisualizer'
import { CodeVisualizer } from 'components/student/courses/[courseId]/modules/[moduleId]/codeVisualizer'

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
  )
}

export default ModuleVisualizer
