import { ICodeRunner } from 'server/providers/codeRunner/iCodeRunner'

class RunCodeService {
  constructor(private codeRunner: ICodeRunner) {}

  async execute({
    code,
    language,
    input,
  }: {
    code: string
    language: string
    input: string
  }) {
    return await this.codeRunner.runCode({ code, language, input })
  }
}

export default RunCodeService
