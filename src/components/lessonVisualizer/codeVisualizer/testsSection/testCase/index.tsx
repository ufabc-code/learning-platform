import { useState } from 'react'
import CodeLesson from 'server/entities/codeLesson'

interface Result {
  loading: boolean
  result: {
    output: string
    status: 'Accepted' | 'Wrong Answer' | 'Error' | ''
  }
}

interface TestCaseProps {
  test: CodeLesson['tests'][0]
  label: string
  result: Result
}

export default function TestCase({
  test,
  label,
  result = {
    loading: false,
    result: {
      output: '',
      status: '',
    },
  },
}: TestCaseProps) {
  const {
    loading,
    result: { output, status },
  } = result

  const [visible, setVisible] = useState(false)

  return (
    <div className="rounded-md border shadow-md">
      <button
        onClick={() => setVisible(!visible)}
        className="flex w-full justify-between p-4 text-left text-2xl font-medium hover:bg-gray-100"
      >
        <span>{label}</span>
        {loading && <span>Executando...</span>}

        {!loading && status === 'Accepted' && (
          <span className="text-green-700">Accepted</span>
        )}

        {!loading && status === 'Wrong Answer' && (
          <span className="text-red-700">Wrong Answer</span>
        )}

        {!loading && status === 'Error' && (
          <span className="text-red-700">Error</span>
        )}
      </button>
      <div className={`overflow-hidden ${visible ? '' : 'h-0 '}`}>
        <div className="grid grid-cols-3 gap-4 px-4 pb-4">
          <div>
            <h3 className="mb-4 font-medium">Entrada</h3>
            <textarea
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-sm text-gray-900"
              value={test.input}
              readOnly
              disabled
            ></textarea>
          </div>
          <div>
            <h3 className="mb-4 font-medium">Saída esperada</h3>
            <textarea
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-sm text-gray-900"
              value={test.expected}
              readOnly
              disabled
            ></textarea>
          </div>
          <div>
            <h3 className="mb-4 font-medium">Saída produzida</h3>
            <textarea
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-mono text-sm text-gray-900"
              disabled
              readOnly
              value={output}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}
