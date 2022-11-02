import { container } from 'server/container'
import RunCodeService from './runCodeService'

export const runCodeFactory = () => {
  const { codeRunner} = container()
  return new RunCodeService(codeRunner)
}
