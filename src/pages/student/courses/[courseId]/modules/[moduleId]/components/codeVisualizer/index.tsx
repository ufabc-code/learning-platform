import { PlayIcon } from '@heroicons/react/24/outline'
import CodeEditor from 'components/codeEditor'
import MarkdownRender from 'components/markdownRender'
import TestCase from 'components/student/courses/[courseId]/modules/[moduleId]/components/codeVisualizer/TestCase'
import Tabs from 'components/tabs'
import { useState } from 'react'
import CodeLesson from 'server/entities/codeLesson'
import {
  CodeRunnerStatus,
  ICodeRunnerResult,
} from 'server/providers/codeRunner/iCodeRunner'
import { trpc } from 'utils/trpc'

interface CodeVisualizerProps {
  codeLesson: CodeLesson
  handleEvaluateAnswer: (answer: { code: string; language: string }) => void
}

export function CodeVisualizer({
  codeLesson,
  handleEvaluateAnswer,
}: CodeVisualizerProps) {
  const [code, setCode] = useState(codeLesson.template.code)
  const [language, setLanguage] = useState(codeLesson.template.language)
  const [stdin, setStdin] = useState('')
  const [result, setResult] = useState<ICodeRunnerResult>({
    status: CodeRunnerStatus.OK,
    output: '',
  })
  const { mutate: runCode } = trpc.useMutation('runCode.run')

  const languages = ['c++', 'javascript', 'python']

  async function handleRunCode() {
    runCode(
      {
        code: JSON.stringify({
          status: {
            'input-1': CodeRunnerStatus.OK,
            'input-2': CodeRunnerStatus.OK,
          },
          outputs: {
            'input-1': 'correct-output-1',
            'input-2': 'correct-output-2',
          },
        }),
        language,
        input: 'input-1',
      },
      {
        onSuccess: (data) => {
          setResult(data)
        },
      },
    )
  }

  return (
    <div className="m-2 py-2">
      <div>
        <Tabs
          active={0}
          tabs={[
            {
              name: 'Exercício',
              children: (
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
                        className="flex items-center rounded-lg border py-2 px-4 text-green-500 hover:border-green-100 hover:bg-green-100"
                      >
                        <PlayIcon className="h-6 w-6" />
                        <span className="ml-2">Executar</span>
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
              ),
            },
            {
              name: 'Testes',
              children: (
                <div className="grid grid-cols-1 gap-4 pb-4">
                  {codeLesson.tests.map((test, index) => (
                    <TestCase
                      key={index}
                      label={`Teste #${index + 1}`}
                      test={test}
                    />
                  ))}
                </div>
              ),
            },
            {
              name: 'Solução',
              children: (
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
              ),
            },
          ]}
        />
      </div>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => handleEvaluateAnswer({ code, language })}
          className="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Verificar
        </button>
      </div>
    </div>
  )
}
