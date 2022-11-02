import { CodeRunnerStatus, ICodeRunner, ICodeRunnerResult } from './iCodeRunner'

class FakeCodeRunner implements ICodeRunner {
  async runCode({
    code,
    input
  }: {
    code: string
    language: string
    input: string
  }): Promise<ICodeRunnerResult> {
    const data = JSON.parse(code)
    const status = data.status as Record<string, ICodeRunnerResult['status']>
    const outputs = data.outputs as Record<string, string>

    return {
      status: (status && status[input]) || CodeRunnerStatus.ERROR,
      output: (outputs[input] as string) || ''
    }
  }
}

export default FakeCodeRunner
