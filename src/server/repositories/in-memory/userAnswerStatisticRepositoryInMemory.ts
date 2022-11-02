import UserAnswerStatistic from 'server/entities/userAnswerStatistic'
import IUserAnswerStatisticRepository from '../iUserAnswerStatisticRepository'

class UserAnswerStatisticRepositoryInMemory
  implements IUserAnswerStatisticRepository
{
  private userAnswerStatistics: UserAnswerStatistic[] = []

  async save(userAnswerStatistic: UserAnswerStatistic): Promise<void> {
    this.userAnswerStatistics = this.userAnswerStatistics.filter(
      ({ userId, courseId, moduleId, lessonId }) =>
        userId !== userAnswerStatistic.userId ||
        courseId !== userAnswerStatistic.courseId ||
        moduleId !== userAnswerStatistic.moduleId ||
        lessonId !== userAnswerStatistic.lessonId
    )
    this.userAnswerStatistics.push(userAnswerStatistic)
  }

  async getAll(): Promise<UserAnswerStatistic[]> {
    return this.userAnswerStatistics
  }

  async clear(): Promise<void> {
    this.userAnswerStatistics = []
  }
}

export default UserAnswerStatisticRepositoryInMemory
