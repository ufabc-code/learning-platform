import { container } from 'server/container'
import { CodeRunnerStatus } from 'server/providers/codeRunner/iCodeRunner'
import RunCodeService from './runCodeService'

describe('Run Code Service', () => {
  it('Should be to run a code status: OK', async () => {
    const { codeRunner } = container()
    const runCodeService = new RunCodeService(codeRunner)

    const result = await runCodeService.execute({
      code: JSON.stringify({
        status: {
          'input-1': CodeRunnerStatus.OK,
        },
        outputs: {
          'input-1': 'output-1',
        },
      }),
      input: 'input-1',
      language: '',
    })

    expect(result.status).toBe(CodeRunnerStatus.OK)
    expect(result.output).toBe('output-1')
  })

  it('Should be to run a code status: ERROR', async () => {
    const { codeRunner } = container()
    const runCodeService = new RunCodeService(codeRunner)

    const result = await runCodeService.execute({
      code: JSON.stringify({
        status: {
          'input-1': CodeRunnerStatus.ERROR,
        },
        outputs: {
          'input-1': '',
        },
      }),
      input: 'input-1',
      language: '',
    })

    expect(result.status).toBe(CodeRunnerStatus.ERROR)
    expect(result.output).toBe('')
  })

  it('Should be to run a code status: TIMEOUT', async () => {
    const { codeRunner } = container()
    const runCodeService = new RunCodeService(codeRunner)

    const result = await runCodeService.execute({
      code: JSON.stringify({
        status: {
          'input-1': CodeRunnerStatus.TIMEOUT,
        },
        outputs: {
          'input-1': '',
        },
      }),
      input: 'input-1',
      language: '',
    })

    expect(result.status).toBe(CodeRunnerStatus.TIMEOUT)
    expect(result.output).toBe('')
  })
})
