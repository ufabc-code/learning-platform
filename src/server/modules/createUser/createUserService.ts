import { v4 as uuid } from 'uuid'
import User from 'server/entities/user'
import IUserRepository from 'server/repositories/iUserRepository'

class CreateUserService {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email }: { email: string }) {
    const existingUser = await this.userRepository.findByEmail(email)

    if (existingUser) {
      throw new Error('User already exists')
    }

    const user = new User({
      id: uuid(),
      email
    })
    await this.userRepository.save(user)
    return user
  }
}

export default CreateUserService
