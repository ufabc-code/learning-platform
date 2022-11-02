import User from 'server/entities/user'

interface IUserRepository {
  save(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  clear(): Promise<void>
}

export default IUserRepository
