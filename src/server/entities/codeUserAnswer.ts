import { container } from 'server/container'
import {
  CodeRunnerStatus,
  ICodeRunner,
} from 'server/providers/codeRunner/iCodeRunner'
import CodeLesson from './codeLesson'
import { UserAnswer, UserAnswerEvaluation } from './lessonUserAnswer'

export class CodeUserAnswer implements UserAnswer {
  static codeRunner: ICodeRunner = container().codeRunner

  public code: string
  public language: string

  constructor({ code, language }: { code: string; language: string }) {
    this.code = code
    this.language = language
  }

  async evaluate({ tests }: CodeLesson): Promise<UserAnswerEvaluation> {
    const executions = await Promise.all(
      tests.map(async (test) => {
        const { input } = test
        return await CodeUserAnswer.codeRunner.runCode({
          code: this.code,
          language: this.language,
          input,
        })
      }),
    )

    if (executions.some(({ status }) => status === CodeRunnerStatus.ERROR)) {
      return {
        correct: false,
        message: 'Execution error',
      }
    }

    if (executions.some(({ status }) => status === CodeRunnerStatus.TIMEOUT)) {
      return {
        correct: false,
        message: 'Execution timeout',
      }
    }

    const allTestsPassed = executions.every((result, index) => {
      const test = tests[index]
      if (!test) return false
      return this.equal({
        stdout: result.output,
        expectedOutput: test.expected,
      })
    })

    return {
      correct: allTestsPassed,
      message: allTestsPassed ? 'Correct' : 'Wrong',
    }
  }

  private equal({
    stdout,
    expectedOutput,
  }: {
    stdout: string
    expectedOutput: string
  }): boolean {
    const linesStdout: string[] = stdout
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    const linesExpectedOutput: string[] = expectedOutput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    if (linesStdout.length !== linesExpectedOutput.length) {
      return false
    }

    for (let i = 0; i < linesStdout.length; i++) {
      if (linesStdout[i] !== linesExpectedOutput[i]) {
        return false
      }
    }

    return true
  }
}
