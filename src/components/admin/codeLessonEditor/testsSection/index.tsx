import { PlusIcon } from '@heroicons/react/24/solid'
import CodeLesson from 'server/entities/codeLesson'
import TestCase from './testCase'

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

  function handleRemoveTest(index: number) {
    const updatedLesson = { ...codeLesson }
    updatedLesson.tests.splice(index, 1)
    setCodeLesson(updatedLesson)
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between">
        <h1 className="my-4">Testes</h1>
        <button
          className="rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700"
          onClick={handleAddTest}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4">
        {codeLesson.tests.map((test, index) => (
          <TestCase
            key={index}
            index={index}
            codeLesson={codeLesson}
            setCodeLesson={setCodeLesson}
            handleRemoveTest={() => {
              handleRemoveTest(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default TestsSection
