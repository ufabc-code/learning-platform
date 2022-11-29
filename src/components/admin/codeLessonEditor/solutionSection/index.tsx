import CodeEditor from 'components/codeEditor'
import CodeLesson from 'server/entities/codeLesson'

interface SolutionSectionProps {
  codeLesson: CodeLesson
  setCodeLesson: (codeLesson: CodeLesson) => void
}

function SolutionSection({ codeLesson, setCodeLesson }: SolutionSectionProps) {
  return (
    <div className="rounded-lg border p-4">
      <h1 className="my-2">Solução</h1>
      <div>
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Código
          </label>
          <CodeEditor
            code={codeLesson.solution.code}
            language={codeLesson.solution.language}
            onchange={(code) =>
              setCodeLesson({
                ...codeLesson,
                solution: { ...codeLesson.solution, code },
              })
            }
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
            value={codeLesson.solution.language}
            onChange={(e) => {
              const updatedLesson = { ...codeLesson }
              updatedLesson.solution.language = e.target.value
              setCodeLesson(updatedLesson)
            }}
            type="text"
            id="title"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="python"
            required
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Explicação
          </label>
          <textarea
            value={codeLesson.solution.text}
            onChange={(e) => {
              const updatedLesson = { ...codeLesson }
              updatedLesson.solution.text = e.target.value
              setCodeLesson(updatedLesson)
            }}
            id="title"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="O motivo do algoritmo funcionar..."
            required
          />
        </div>
      </div>
    </div>
  )
}

export default SolutionSection
