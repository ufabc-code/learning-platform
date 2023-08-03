import { PlayIcon } from '@heroicons/react/24/outline'
import CodeEditor from 'components/codeEditor'
import Spinner from 'components/spinner'
import { useState } from 'react'
import {
  CodeRunnerStatus,
  ICodeRunnerResult,
} from 'server/providers/codeRunner/iCodeRunner'
import { trpc } from 'utils/trpc'

function Programming() {
  const languages = ['c++', 'javascript', 'python']
  const [language, setLanguage] = useState('')
  const [codeRunning, setCodeRunning] = useState(false)
  const [code, setCode] = useState('')
  const [stdin, setStdin] = useState('')

  const [result, setResult] = useState<ICodeRunnerResult>({
    status: CodeRunnerStatus.OK,
    output: '',
    stderr: '',
  })

  async function runCode({
    code,
    language,
    input,
  }: {
    code: string
    language: string
    input: string
  }): Promise<ICodeRunnerResult> {
    const client = trpc.createClient({
      url: '/api/trpc',
    })

    return await client.mutation('runCode.run', {
      code,
      language,
      input,
    })
  }

  async function handleRunCode() {
    setCodeRunning(true)
    setResult(await runCode({ code, language, input: stdin }))
    setCodeRunning(false)
  }

  return (
    <div className="my-3 mx-5">
      <div className="flex flex-row">
        <CodeEditor
          code={code}
          language={language}
          onchange={(code) => {
            setCode(code)
          }}
          className="w-[calc(100vw-440px)] h-[calc(100vh-10rem)] pr-5 text-base"
        />
        <div className="flex flex-col w-[400px]">
          <select
            id="language"
            className="w-full h-fit rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900"
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
            className={`mt-1 w-full h-fit flex text-white font-bold items-center rounded-lg bg-green-500 py-2 px-4 ${codeRunning
                ? 'cursor-not-allowed bg-green-700'
                : 'text-white hover:bg-green-700'
              }`}
            disabled={codeRunning}
          >
            {codeRunning ? (
              <>
                <span>
                  <Spinner className="h-6 w-6" />
                </span>
                <span className="">Executando...</span>
              </>
            ) : (
              <>
                <PlayIcon className="mr-4 h-6 w-6" />
                <span className="">Executar</span>
              </>
            )}
          </button>
          <div className="mt-7 h-full">
            <div className="h-fit mb-10">
              <label
                htmlFor="stdin"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Entrada
              </label>
              <textarea
                id="stdin"
                className="h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                value={stdin}
                onChange={(e) => {
                  setStdin(e.target.value)
                }}
                rows={3}
              />
            </div>
            <div className="h-[calc(100%-12.5rem)]">
              <label
                htmlFor="stdout"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Saída
              </label>
              <textarea
                id="stdout"
                className="h-full w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                value={result.output + result.stderr}
                disabled
                readOnly
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Programming
