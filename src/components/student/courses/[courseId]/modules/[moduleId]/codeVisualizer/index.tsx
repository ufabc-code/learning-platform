import Tabs from 'components/tabs'
import { useEffect, useState } from 'react'
import CodeLesson from 'server/entities/codeLesson'
import {
  CodeRunnerStatus,
  ICodeRunnerResult,
} from 'server/providers/codeRunner/iCodeRunner'
import { trpc } from 'utils/trpc'
import ExerciseSection from './exerciseSection'
import SolutionSection from './solutionSection'
import TestsSection from './testsSection'

interface Result {
  loading: boolean
  result: {
    output: string
    status: 'Accepted' | 'Wrong Answer' | 'Error' | ''
  }
}

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
  const [codeRunning, setCodeRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<Result[]>([])

  const languages = ['c++', 'javascript', 'python']

  useEffect(() => {
    setResults(
      codeLesson.tests.map(() => ({
        loading: false,
        result: {
          output: '',
          status: '',
        },
      })),
    )
  }, [codeLesson.tests])

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

  function getVerdict({
    stdout,
    errorMessage,
    expectedOutput,
  }: {
    stdout: string
    errorMessage: string
    expectedOutput: string
  }): 'Accepted' | 'Wrong Answer' | 'Error' | '' {
    if (errorMessage) {
      return 'Error'
    }

    const linesStdout: string[] = stdout
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    const linesExpectedOutput: string[] = expectedOutput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    if (linesStdout.length !== linesExpectedOutput.length) {
      return 'Wrong Answer'
    }

    for (let i = 0; i < linesStdout.length; i++) {
      if (linesStdout[i] !== linesExpectedOutput[i]) {
        return 'Wrong Answer'
      }
    }

    return 'Accepted'
  }

  async function runTest(
    test: { input: string; expectedOutput: string },
    testId: number,
  ) {
    const progressPerTest = 100 / codeLesson.tests.length
    try {
      const executionResult = await runCode({
        code,
        language,
        input: test.input,
      })

      setProgress((progress) => progress + progressPerTest / 2)

      setResults((prevResults) => {
        prevResults[testId] = {
          loading: false,
          result: {
            output:
              executionResult.output + '\n' + (executionResult.stderr || ''),
            status: getVerdict({
              stdout: executionResult.output,
              errorMessage: executionResult.stderr || '',
              expectedOutput: test.expectedOutput,
            }),
          },
        }
        return [...prevResults]
      })
    } catch (error) {
      setProgress((progress) => progress + progressPerTest / 2)
      setResults((prevResults) => {
        prevResults[testId] = {
          loading: false,
          result: {
            output: 'Unknown Error',
            status: 'Error',
          },
        }
        return [...prevResults]
      })
    }
  }

  function getEmptyResult(loading = false): Result {
    const result: Result = {
      loading,
      result: {
        output: '',
        status: '',
      },
    }
    return result
  }

  function handleRunTests() {
    setProgress(0)
    const newResults = []
    for (let i = 0; i < codeLesson.tests.length; i++) {
      newResults.push(getEmptyResult(true))
    }
    setResults(newResults)

    const progressPerTest = 100 / codeLesson.tests.length
    for (let id = 0; id < codeLesson.tests.length; id++) {
      setProgress((progress) => progress + progressPerTest / 2)
      const test = codeLesson.tests[id]
      if (test) {
        runTest(
          {
            input: test.input,
            expectedOutput: test.expected,
          },
          id,
        )
      }
    }
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
                <ExerciseSection
                  codeLesson={codeLesson}
                  language={language}
                  setLanguage={setLanguage}
                  languages={languages}
                  codeRunning={codeRunning}
                  stdin={stdin}
                  code={code}
                  setCode={setCode}
                  handleRunCode={handleRunCode}
                  result={result}
                  setStdin={setStdin}
                />
              ),
            },
            {
              name: 'Testes',
              children: (
                <TestsSection
                  progress={progress}
                  results={results}
                  handleRunTests={handleRunTests}
                  codeLesson={codeLesson}
                />
              ),
            },
            {
              name: 'Solução',
              children: <SolutionSection codeLesson={codeLesson} />,
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
