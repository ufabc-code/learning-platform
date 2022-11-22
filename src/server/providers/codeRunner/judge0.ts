import axios from 'axios'
import { CodeRunnerStatus, ICodeRunner, ICodeRunnerResult } from './iCodeRunner'

interface Judge0Result {
  status: {
    id: number
    description: string
  }
  stdout: string
  stderr: string
  compile_output: string
}

class Judge0 implements ICodeRunner {
  private languageMap: Record<string, number> = {
    python: 71,
    'c++': 54,
  }

  private statusMap: Record<string, CodeRunnerStatus> = {
    3: CodeRunnerStatus.OK,
    5: CodeRunnerStatus.TIMEOUT,
  }

  async runCode({
    code,
    language,
    input,
  }: {
    code: string
    language: string
    input: string
  }): Promise<ICodeRunnerResult> {
    const { data } = await axios.post(
      'https://ce.judge0.com/submissions?base64_encoded=true&wait=true',
      {
        source_code: this.encodeBase64(code),
        language_id: this.languageMap[language] || 0,
        stdin: this.encodeBase64(input),
      },
      {
        headers: {
          origin: 'https://ide.judge0.com',
        },
      },
    )

    const judge0Result = data as Judge0Result

    const result: ICodeRunnerResult = {
      output: this.decodeBase64(judge0Result.stdout),
      status: this.statusMap[judge0Result.status.id] || CodeRunnerStatus.ERROR,
      stderr: this.joinErrors([
        this.decodeBase64(judge0Result.stderr),
        this.decodeBase64(judge0Result.compile_output),
      ]),
    }

    return result
  }

  private joinErrors(errors: string[]): string {
    let result = ''
    for (const error of errors) {
      if (error) {
        result += error + '\n'
      }
    }
    return result
  }

  private encodeBase64(str: string): string {
    return Buffer.from(str || '').toString('base64')
  }

  private decodeBase64(str: string): string {
    return Buffer.from(str || '', 'base64').toString()
  }
}

export default Judge0
