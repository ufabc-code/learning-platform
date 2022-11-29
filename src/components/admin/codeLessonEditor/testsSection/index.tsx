import { PlusIcon } from '@heroicons/react/24/solid'
import CodeLesson from 'server/entities/codeLesson'
interface TestsSectionProps {
  codeLesson: CodeLesson
  setCodeLesson: (codeLesson: CodeLesson) => void
}

function TestsSection({ codeLesson, setCodeLesson }: TestsSectionProps) {
  function handleAddTest() {
    const updatedLesson = { ...codeLesson }
    updatedLesson.tests.push({ input: '', expected: '' })
    setCodeLesson(updatedLesson)
  }

  return (
    <div className="rounded-lg border p-4">
      <h1 className="my-4">Testes</h1>
      <div>
        {codeLesson.tests.map((test, index) => (
          <div key={index}>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Teste {index}
            </label>
            <div className="inline">
              <textarea
                value={test.input}
                onChange={(e) => {
                  test.input = e.target.value
                  const updatedLesson = { ...codeLesson }
                  updatedLesson.tests[index] = test
                  setCodeLesson(updatedLesson)
                }}
                id={'test-in-' + index}
                className="inline w-max rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="1 2 3 4"
                required
              />
              <textarea
                value={test.expected}
                onChange={(e) => {
                  test.expected = e.target.value
                  const updatedLesson = { ...codeLesson }
                  updatedLesson.tests[index] = test
                  setCodeLesson(updatedLesson)
                }}
                id={'test-out-' + index}
                className="ml-2 inline w-max rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="1 2 3 4"
                required
              />
            </div>
          </div>
        ))}
      </div>
      <div className="my-4 text-left">
        <button
          className="rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
          onClick={handleAddTest}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export default TestsSection
