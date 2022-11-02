import { container } from 'server/container'
import CreateUserService from './createUserService'

beforeEach(() => {
  const { userRepository } = container()
  return userRepository.clear()
})

describe('Create User Service', () => {
  it('Should be able to create a new user', async () => {
    const { userRepository } = container()
    const createUserService = new CreateUserService(userRepository)
    await createUserService.execute({ email: 'user@user.com' })

    const user = await userRepository.findByEmail('user@user.com')
    expect(user).not.toBeNull()
  })

  it("Should not be able to create a new user with an email that's already in use", async () => {
    const { userRepository } = container()
    const createUserService = new CreateUserService(userRepository)

    // Create a user
    await createUserService.execute({ email: 'user@user.com' })
    const user = await userRepository.findByEmail('user@user.com')
    expect(user).not.toBeNull()

    // create another user with the same email
    await expect(
      createUserService.execute({ email: 'user@user.com' })
    ).rejects.toThrow('User already exists')
  })
})
