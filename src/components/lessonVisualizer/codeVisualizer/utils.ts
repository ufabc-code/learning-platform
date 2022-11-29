export interface Result {
  loading: boolean
  result: {
    output: string
    status: 'Accepted' | 'Wrong Answer' | 'Error' | ''
  }
}

export function getEmptyResult(loading = false): Result {
  const result: Result = {
    loading,
    result: {
      output: '',
      status: '',
    },
  }
  return result
}

export function getVerdict({
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
