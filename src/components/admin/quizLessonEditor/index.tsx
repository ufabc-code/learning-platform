import QuizLesson from 'server/entities/quizLesson'
import StatementSection from './statementSection'
import SolutionSection from './solutionSection'
import AlternativesSection from './alternativesSection'
import Tabs from 'components/tabs'
import { useState } from 'react'
import { QuizVisualizer } from 'components/lessonVisualizer/quizVisualizer'
import { trpc } from 'utils/trpc'

interface QuizLessonEditorProps {
  quizLesson: QuizLesson
  setQuizLesson: (quizLesson: QuizLesson) => void
  courseId: string
  moduleId: string
}

export function QuizLessonEditor({
  quizLesson,
  setQuizLesson,
  courseId,
  moduleId,
}: QuizLessonEditorProps) {
  const [activeTab, setActiveTab] = useState(0)
  const { mutate: evaluateLesson } = trpc.useMutation('evaluateLesson.evaluate')

  function handleEvaluateLesson(answer: {
    alternatives: number[]
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      evaluateLesson(
        {
          courseId,
          moduleId,
          lessonId: quizLesson.id,
          answer,
        },
        {
          onSuccess(data) {
            resolve(data.correct)
          },
          onError() {
            reject()
          },
        },
      )
    })
  }

  const handleEvaluateAnswer = async (answer: { alternatives: number[] }) => {
    const result = await handleEvaluateLesson(answer)
    return result
  }

  return (
    <div className="mt-4">
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          {
            name: 'Raw',
            children: (
              <div className="grid grid-cols-1 gap-4">
                <StatementSection
                  quizLesson={quizLesson}
                  setQuizLesson={setQuizLesson}
                />
                <SolutionSection
                  quizLesson={quizLesson}
                  setQuizLesson={setQuizLesson}
                />
                <AlternativesSection
                  quizLesson={quizLesson}
                  setQuizLesson={setQuizLesson}
                />
              </div>
            ),
          },
          {
            name: 'Preview',
            children: (
              <QuizVisualizer
                quizLesson={quizLesson}
                handleEvaluateAnswer={handleEvaluateAnswer}
                debug={true}
              />
            ),
          },
        ]}
      />
    </div>
  )
}
