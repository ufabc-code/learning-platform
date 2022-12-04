import { configs } from './configs/index'
import UserAnswerStatistic from 'server/entities/userAnswerStatistic'
import IUserAnswerStatisticRepository from '../iUserAnswerStatisticRepository'
import clientPromise from './configs/mongodb'

class UserAnswerStatisticRepositoryMongoDB
  implements IUserAnswerStatisticRepository
{
  private namespace = configs.namespace
  private collectionName = configs.collections.userAnswerStatistics.name

  async save(userAnswerStatistic: UserAnswerStatistic): Promise<void> {
    const client = await clientPromise
    const db = client.db(this.namespace)
    await db.collection(this.collectionName).updateOne(
      {
        userId: userAnswerStatistic.userId,
        courseId: userAnswerStatistic.courseId,
        moduleId: userAnswerStatistic.moduleId,
        lessonId: userAnswerStatistic.lessonId,
      },
      {
        $set: userAnswerStatistic,
      },
      {
        upsert: true,
      },
    )
  }

  async getAll(): Promise<UserAnswerStatistic[]> {
    const client = await clientPromise
    const db = client.db(this.namespace)
    const userAnswerStatisticsData = await db
      .collection<UserAnswerStatistic>(this.collectionName)
      .find()
      .toArray()
    return userAnswerStatisticsData.map(
      (userAnswerStatisticData) =>
        new UserAnswerStatistic({ ...userAnswerStatisticData }),
    )
  }

  async clear(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findByUserAndCourse({
    userId,
    courseId,
  }: {
    userId: string
    courseId: string
  }): Promise<UserAnswerStatistic[]> {
    const client = await clientPromise
    const db = client.db(this.namespace)
    const userAnswerStatisticsData = await db
      .collection<UserAnswerStatistic>(this.collectionName)
      .find({
        userId,
        courseId,
      })
      .toArray()
    return userAnswerStatisticsData.map(
      (userAnswerStatisticData) =>
        new UserAnswerStatistic({ ...userAnswerStatisticData }),
    )
  }

  async findAllByUserId(userId: string): Promise<UserAnswerStatistic[]> {
    const client = await clientPromise
    const db = client.db(this.namespace)
    const userAnswerStatisticsData = await db
      .collection<UserAnswerStatistic>(this.collectionName)
      .find({
        userId,
      })
      .toArray()
    return userAnswerStatisticsData.map(
      (userAnswerStatisticData) =>
        new UserAnswerStatistic({ ...userAnswerStatisticData }),
    )
  }
}

export default UserAnswerStatisticRepositoryMongoDB
