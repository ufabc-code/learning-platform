import CodeEditor from 'components/codeEditor'
import MarkdownRender from 'components/markdownRender'
import CodeLesson from 'server/entities/codeLesson'

interface SolutionSectionProps {
  codeLesson: CodeLesson
}

function SolutionSection({ codeLesson }: SolutionSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MarkdownRender content={codeLesson.solution.text} />
      <div>
        <CodeEditor
          code={codeLesson.solution.code}
          language={codeLesson.solution.language}
          className="h-96"
        />
      </div>
    </div>
  )
}

export default SolutionSection
