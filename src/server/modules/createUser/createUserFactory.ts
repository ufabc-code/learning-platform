import { container } from 'server/container'
import CreateUserService from './createUserService'

export const createUserFactory = () => {
  const { userRepository } = container()
  return new CreateUserService(userRepository)
}
