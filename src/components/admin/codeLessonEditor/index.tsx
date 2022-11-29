import { CodeVisualizer } from 'components/lessonVisualizer/codeVisualizer'
import Tabs from 'components/tabs'
import { useState } from 'react'
import CodeLesson from 'server/entities/codeLesson'
import { trpc } from 'utils/trpc'
import SolutionSection from './solutionSection'
import StatementSection from './statementSection'
import TemplateSection from './templateSection'
import TestsSection from './testsSection'

interface CodeLessonEditorProps {
  codeLesson: CodeLesson
  setCodeLesson: (codeLesson: CodeLesson) => void
  courseId: string
  moduleId: string
}

export function CodeLessonEditor({
  codeLesson,
  setCodeLesson,
  courseId,
  moduleId,
}: CodeLessonEditorProps) {
  const [activeTab, setActiveTab] = useState(0)
  const { mutate: evaluateLesson } = trpc.useMutation('evaluateLesson.evaluate')

  function handleEvaluateLesson(answer: {
    code: string
    language: string
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      evaluateLesson(
        {
          courseId,
          moduleId,
          lessonId: codeLesson.id,
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

  const handleEvaluateAnswer = async (answer: {
    code: string
    language: string
  }) => {
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
              <div className="grid grid-cols-1 gap-2">
                <StatementSection
                  codeLesson={codeLesson}
                  setCodeLesson={setCodeLesson}
                />
                <SolutionSection
                  codeLesson={codeLesson}
                  setCodeLesson={setCodeLesson}
                />
                <TemplateSection
                  codeLesson={codeLesson}
                  setCodeLesson={setCodeLesson}
                />
                <TestsSection
                  codeLesson={codeLesson}
                  setCodeLesson={setCodeLesson}
                />
              </div>
            ),
          },
          {
            name: 'Preview',
            children: (
              <CodeVisualizer
                codeLesson={codeLesson}
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
