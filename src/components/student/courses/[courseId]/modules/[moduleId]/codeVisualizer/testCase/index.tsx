import { useState } from 'react'
import CodeLesson from 'server/entities/codeLesson'

interface TestCaseProps {
  test: CodeLesson['tests'][0]
  label: string
}

export default function TestCase({ test, label }: TestCaseProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="rounded-md border shadow-md">
      <button
        onClick={() => setVisible(!visible)}
        className="w-full p-4 text-left text-2xl font-medium hover:bg-gray-100"
      >
        {label}
      </button>
      <div className={`overflow-hidden ${visible ? '' : 'h-0 '}`}>
        <div className="grid grid-cols-3 gap-4 px-4 pb-4">
          <div>
            <h3 className="mb-4 font-medium">Entrada</h3>
            <textarea
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              value={test.input}
            ></textarea>
          </div>
          <div>
            <h3 className="mb-4 font-medium">Saída esperada</h3>
            <textarea
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
              value={test.expected}
            ></textarea>
          </div>
          <div>
            <h3 className="mb-4 font-medium">Saída produzida</h3>
            <textarea
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}
