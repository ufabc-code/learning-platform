import UserAnswerStatistic from 'server/entities/userAnswerStatistic'

interface IUserAnswerStatisticRepository {
  save(userAnswerStatistic: UserAnswerStatistic): Promise<void>
  getAll(): Promise<UserAnswerStatistic[]>
  clear(): Promise<void>
  findByUserAndCourse({
    userId,
    courseId,
  }: {
    userId: string
    courseId: string
  }): Promise<UserAnswerStatistic[]>
}

export default IUserAnswerStatisticRepository
