export enum CodeRunnerStatus {
  OK = 'OK',
  ERROR = 'ERROR',
  TIMEOUT = 'TIMEOUT'
}

export interface ICodeRunnerResult {
  output: string
  status: CodeRunnerStatus
}

export interface ICodeRunner {
  runCode(data: {
    code: string
    language: string
    input: string
  }): Promise<ICodeRunnerResult>
}
