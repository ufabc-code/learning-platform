import { container } from 'server/container'
import SignInService from './signInService'

export const signInFactory = () => {
  const { userRepository, authProviders } = container()
  return new SignInService(userRepository, authProviders)
}
