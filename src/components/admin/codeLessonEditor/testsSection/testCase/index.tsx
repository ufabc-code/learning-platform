import { PlayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Spinner from 'components/spinner'
import { useState } from 'react'
import CodeLesson from 'server/entities/codeLesson'
import { ICodeRunnerResult } from 'server/providers/codeRunner/iCodeRunner'
import { trpc } from 'utils/trpc'

interface TestsCaseProps {
  index: number
  codeLesson: CodeLesson
  setCodeLesson: (codeLesson: CodeLesson) => void
  handleRemoveTest: () => void
}

function TestCase({
  index,
  codeLesson,
  setCodeLesson,
  handleRemoveTest,
}: TestsCaseProps) {
  const [codeRunning, setCodeRunning] = useState(false)
  const test = codeLesson.tests[index]

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

  async function handleGenerateExpectedOutput() {
    if (!test) return
    setCodeRunning(true)
    const stdout = await runCode({
      code: codeLesson.solution.code,
      language: codeLesson.solution.language,
      input: test.input,
    })

    test.expected = stdout.output
    setCodeLesson({ ...codeLesson })
    setCodeRunning(false)
  }

  if (!test) return null

  return (
    <div className="rounded-md border p-4">
      <h4 className="mb-2 block text-sm font-medium text-gray-900">
        Teste {index + 1}
      </h4>
      <div className="flex gap-x-4">
        <div className="grow">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Entrada
              </label>
              <textarea
                value={test.input}
                onChange={(e) => {
                  test.input = e.target.value
                  const updatedLesson = { ...codeLesson }
                  updatedLesson.tests[index] = { ...test }
                  setCodeLesson({ ...codeLesson })
                }}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Entrada"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Saída esperada
              </label>
              <textarea
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                disabled={true}
                readOnly={true}
                value={test.expected}
              />
            </div>
          </div>
        </div>
        <div className="flex grow-0 items-center justify-end gap-x-2">
          <button
            className="rounded-md border p-2 text-green-500 hover:bg-green-100"
            onClick={handleGenerateExpectedOutput}
          >
            {codeRunning ? (
              <Spinner className="h-7 w-7" />
            ) : (
              <PlayIcon className="h-8 w-8" />
            )}
          </button>
          <button
            className="rounded-md border p-2 text-red-500 hover:bg-red-100"
            onClick={handleRemoveTest}
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestCase
