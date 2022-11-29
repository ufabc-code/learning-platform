import CodeLesson from 'server/entities/codeLesson'
import SolutionSection from './solutionSection'
import StatementSection from './statementSection'
import TemplateSection from './templateSection'
import TestsSection from './testsSection'

interface CodeLessonEditorProps {
  codeLesson: CodeLesson
  setCodeLesson: (codeLesson: CodeLesson) => void
}

export function CodeLessonEditor({
  codeLesson,
  setCodeLesson,
}: CodeLessonEditorProps) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-2">
      <StatementSection codeLesson={codeLesson} setCodeLesson={setCodeLesson} />
      <SolutionSection codeLesson={codeLesson} setCodeLesson={setCodeLesson} />
      <TemplateSection codeLesson={codeLesson} setCodeLesson={setCodeLesson} />
      <TestsSection codeLesson={codeLesson} setCodeLesson={setCodeLesson} />
    </div>
  )
}
