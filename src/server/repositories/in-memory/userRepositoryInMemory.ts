import User from 'server/entities/user'
import IUserRepository from '../iUserRepository'

class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = []

  async save(user: User): Promise<void> {
    this.users = this.users.filter(({ id }) => id !== user.id)
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(({ email: userEmail }) => userEmail === email)
    return user || null
  }

  async clear(): Promise<void> {
    this.users = []
  }
}

export default UserRepositoryInMemory
