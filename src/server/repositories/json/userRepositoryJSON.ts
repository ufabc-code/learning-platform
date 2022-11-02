import User from 'server/entities/user'
import IUserRepository from 'server/repositories/iUserRepository'
import fs from 'fs'
import path from 'path'

class UserRepositoryJSON implements IUserRepository {
  private filename = 'users.json'

  async save(user: User): Promise<void> {
    let users = await this.getUsersFromFile()
    users = users.filter(({ id }) => id !== user.id)
    users.push(user)
    await this.saveUsersToFile(users)
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.getUsersFromFile()
    const user = users.find((user) => user.email === email)
    return user || null
  }

  async clear(): Promise<void> {
    await this.saveUsersToFile([])
  }

  private async getUsersFromFile(): Promise<User[]> {
    const users: User[] = JSON.parse(
      fs.readFileSync(
        path.join(
          'src',
          'server',
          'repositories',
          'json',
          'files',
          this.filename
        ),
        'utf8'
      )
    )
    return users.map((user) => new User({ ...user }))
  }

  private async saveUsersToFile(users: User[]): Promise<void> {
    fs.writeFileSync(
      path.join(
        'src',
        'server',
        'repositories',
        'json',
        'files',
        this.filename
      ),
      JSON.stringify(users)
    )
  }
}

export default UserRepositoryJSON
