import { container } from 'server/container'
import User from 'server/entities/user'
import SignInService from './signInService'

// function to decode jwt token
const decode = (token: string) => {
  const [, payload] = token.split('.')
  const decodedPayload = Buffer.from(payload || '', 'base64').toString('utf-8')
  return JSON.parse(decodedPayload)
}

beforeEach(() => {
  const { userRepository } = container()
  userRepository.clear()
})

describe('SignIn Service ', () => {
  it('should return a token when the user is authenticated', async () => {
    const { userRepository, authProviders } = container()

    await userRepository.save(
      new User({
        id: '1',
        email: 'user@user.com'
      })
    )

    // sign in
    const signInService = new SignInService(userRepository, authProviders)

    const token = await signInService.signIn({
      email: 'user@user.com',
      provider: 'fake-auth-provider',
      token: 'validToken'
    })

    const decodedToken = decode(token)

    expect('email' in decodedToken).toBe(true)
    expect('id' in decodedToken).toBe(true)
    expect(decodedToken.email).toBe('user@user.com')
    expect(decodedToken.id).toBe('1')
  })

  it("Should throw an error when the user doesn't exist", async () => {
    const { userRepository, authProviders } = container()

    const signInService = new SignInService(userRepository, authProviders)

    await expect(
      signInService.signIn({
        email: 'user@user.com',
        provider: 'fake-auth-provider',
        token: 'validToken'
      })
    ).rejects.toThrow('User not found')
  })

  it("Should throw an error when the provider doesn't exist", async () => {
    const { userRepository, authProviders } = container()
    await userRepository.save(
      new User({
        id: '1',
        email: 'user@user.com'
      })
    )

    const signInService = new SignInService(userRepository, authProviders)
    await expect(
      signInService.signIn({
        email: 'user@user.com',
        provider: 'non-existent-provider',
        token: 'validToken'
      })
    ).rejects.toThrow('Invalid provider')
  })

  it('Should throw an error when the token is invalid', async () => {
    const { userRepository, authProviders } = container()
    await userRepository.save(
      new User({
        id: '1',
        email: 'user@user.com'
      })
    )

    const signInService = new SignInService(userRepository, authProviders)

    await expect(
      signInService.signIn({
        email: 'user@user.com',
        provider: 'fake-auth-provider',
        token: 'invalidToken'
      })
    ).rejects.toThrow('Invalid token')
  })
})
