import User from 'server/entities/user'
import IUserRepository from '../iUserRepository'
import { configs } from './configs'
import clientPromise from './configs/mongodb'

class UserRepositoryMongoDB implements IUserRepository {
  private namespace = configs.namespace
  private collectionName = configs.collections.users.name

  async save(user: User): Promise<void> {
    const client = await clientPromise
    const db = client.db(this.namespace)
    await db.collection(this.collectionName).updateOne(
      {
        id: user.id,
      },
      {
        $set: user,
      },
      {
        upsert: true,
      },
    )
  }

  async findByEmail(email: string): Promise<User | null> {
    const client = await clientPromise
    const db = client.db(this.namespace)
    const userData = await db.collection<User>(this.collectionName).findOne({
      email,
    })
    if (!userData) return null
    return new User({ ...userData })
  }

  async clear(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export default UserRepositoryMongoDB
