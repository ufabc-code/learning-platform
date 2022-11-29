import ProgressBar from 'components/progressBar'
import CodeLesson from 'server/entities/codeLesson'
import TestCase from './testCase'

interface Result {
  loading: boolean
  result: {
    output: string
    status: 'Accepted' | 'Wrong Answer' | 'Error' | ''
  }
}

interface TestsSectionProps {
  codeLesson: CodeLesson
  handleRunTests: () => void
  progress: number
  results: Result[]
}

function TestsSection({
  codeLesson,
  handleRunTests,
  progress,
  results,
}: TestsSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-4 pb-4">
      <div className="flex justify-end">
        <button
          className={`rounded-lg border py-2.5 px-5 text-sm font-medium ${
            progress !== 0 && progress !== 100
              ? 'pointer-events-none cursor-not-allowed bg-blue-200 text-white'
              : 'text-gray-900 hover:bg-gray-100 hover:text-blue-700'
          }`}
          onClick={handleRunTests}
          disabled={progress !== 0 && progress !== 100}
        >
          {progress !== 0 && progress !== 100
            ? 'Executando testes...'
            : 'Executar testes'}
        </button>
      </div>
      <ProgressBar progress={progress} />
      {codeLesson.tests.map((test, index) => (
        <TestCase
          key={index}
          label={`Teste #${index + 1}`}
          test={test}
          result={results[index] as Result}
        />
      ))}
    </div>
  )
}

export default TestsSection
