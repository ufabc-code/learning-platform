import { PlayIcon } from '@heroicons/react/24/outline'
import CodeEditor from 'components/codeEditor'
import MarkdownRender from 'components/markdownRender'
import Spinner from 'components/spinner'
import CodeLesson from 'server/entities/codeLesson'
import { ICodeRunnerResult } from 'server/providers/codeRunner/iCodeRunner'

interface ExerciseSectionProps {
  codeLesson: CodeLesson
  language: string
  setLanguage: (language: string) => void
  languages: string[]
  codeRunning: boolean
  stdin: string
  setStdin: (stdin: string) => void
  code: string
  setCode: (code: string) => void
  handleRunCode: () => void
  result: ICodeRunnerResult
}

function ExerciseSection({
  codeLesson,
  language,
  setLanguage,
  languages,
  codeRunning,
  stdin,
  setStdin,
  code,
  setCode,
  handleRunCode,
  result,
}: ExerciseSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MarkdownRender content={codeLesson.text} />
      <div>
        <div className="mb-4 flex justify-between">
          <select
            id="language"
            className="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value)
            }}
          >
            <option value={''}>Escolha uma linguagem</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>

          <button
            onClick={() => handleRunCode()}
            className={`flex w-44 items-center rounded-lg border py-2 px-4 ${
              codeRunning
                ? 'cursor-not-allowed text-blue-300'
                : 'text-green-500 hover:border-green-100 hover:bg-green-100'
            }`}
            disabled={codeRunning}
          >
            {codeRunning ? (
              <>
                <span>
                  <Spinner className="h-6 w-6" />
                </span>
                <span className="ml-2">Executando...</span>
              </>
            ) : (
              <>
                <PlayIcon className="mr-4 h-6 w-6" />
                <span className="ml-2">Executar</span>
              </>
            )}
          </button>
        </div>
        <CodeEditor
          code={code}
          language={language}
          onchange={(code) => {
            setCode(code)
          }}
          className="h-80"
        />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="stdin"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Entrada
            </label>
            <textarea
              id="stdin"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={stdin}
              onChange={(e) => {
                setStdin(e.target.value)
              }}
              rows={3}
            />
          </div>
          <div>
            <label
              htmlFor="stdout"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Saída
            </label>
            <textarea
              id="stdout"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              value={result.output}
              disabled={true}
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseSection
