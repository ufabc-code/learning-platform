import CodeEditor from 'components/codeEditor'
import CodeLesson from 'server/entities/codeLesson'

interface TemplateSectionProps {
  codeLesson: CodeLesson
  setCodeLesson: (codeLesson: CodeLesson) => void
}

function TemplateSection({ codeLesson, setCodeLesson }: TemplateSectionProps) {
  return (
    <div className="rounded-lg border p-4">
      <h1 className="my-4">Template</h1>
      <div>
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Código
          </label>
          <CodeEditor
            code={codeLesson.template.code}
            language={codeLesson.template.language}
            onchange={(code) => {
              const updatedLesson = { ...codeLesson }
              updatedLesson.template.code = code
              setCodeLesson(updatedLesson)
            }}
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Linguagem
          </label>
          <input
            value={codeLesson.template.language}
            onChange={(e) => {
              const updatedLesson = { ...codeLesson }
              updatedLesson.template.language = e.target.value
              setCodeLesson(updatedLesson)
            }}
            type="text"
            id="title"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="python"
            required
          />
        </div>
      </div>
    </div>
  )
}

export default TemplateSection
