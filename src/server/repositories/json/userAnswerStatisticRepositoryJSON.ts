import IUserAnswerStatisticRepository from 'server/repositories/iUserAnswerStatisticRepository'
import UserAnswerStatistic from 'server/entities/userAnswerStatistic'
import fs from 'fs'
import path from 'path'

class UserAnswerStatisticRepositoryJSON
  implements IUserAnswerStatisticRepository
{
  private filename = 'userAnswerStatistics.json'

  async save(userAnswerStatistic: UserAnswerStatistic): Promise<void> {
    let userAnswerStatistics = await this.getUserAnswerStatisticsFromFile()
    userAnswerStatistics = userAnswerStatistics.filter(
      ({ userId, courseId, moduleId, lessonId }) =>
        userId !== userAnswerStatistic.userId ||
        courseId !== userAnswerStatistic.courseId ||
        moduleId !== userAnswerStatistic.moduleId ||
        lessonId !== userAnswerStatistic.lessonId,
    )
    userAnswerStatistics.push(userAnswerStatistic)
    await this.saveUserAnswerStatisticsToFile(userAnswerStatistics)
  }

  async getAll(): Promise<UserAnswerStatistic[]> {
    return await this.getUserAnswerStatisticsFromFile()
  }

  async findAllByUserId(userId: string): Promise<UserAnswerStatistic[]> {
    const userAnswerStatistics = await this.getUserAnswerStatisticsFromFile()
    return userAnswerStatistics.filter(
      (userAnswerStatistic) => userAnswerStatistic.userId === userId,
    )
  }

  async clear(): Promise<void> {
    await this.saveUserAnswerStatisticsToFile([])
  }

  private async getUserAnswerStatisticsFromFile() {
    const userAnswerStatistics: UserAnswerStatistic[] = JSON.parse(
      fs.readFileSync(
        path.join(
          'src',
          'server',
          'repositories',
          'json',
          'files',
          this.filename,
        ),
        'utf8',
      ),
    )
    return userAnswerStatistics.map(
      (userAnswerStatistic) =>
        new UserAnswerStatistic({ ...userAnswerStatistic }),
    )
  }

  private async saveUserAnswerStatisticsToFile(
    userAnswerStatistics: UserAnswerStatistic[],
  ) {
    fs.writeFileSync(
      path.join(
        'src',
        'server',
        'repositories',
        'json',
        'files',
        this.filename,
      ),
      JSON.stringify(userAnswerStatistics),
    )
  }

  async findByUserAndCourse({
    userId,
    courseId,
  }: {
    userId: string
    courseId: string
  }): Promise<UserAnswerStatistic[]> {
    const userAnswerStatistics = await this.getUserAnswerStatisticsFromFile()
    return userAnswerStatistics.filter(
      (userAnswerStatistic) =>
        userAnswerStatistic.userId === userId &&
        userAnswerStatistic.courseId === courseId,
    )
  }
}
export default UserAnswerStatisticRepositoryJSON
