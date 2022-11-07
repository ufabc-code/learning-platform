import UserAnswerStatistic from 'server/entities/userAnswerStatistic'

interface IUserAnswerStatisticRepository {
  save(userAnswerStatistic: UserAnswerStatistic): Promise<void>
  getAll(): Promise<UserAnswerStatistic[]>
  clear(): Promise<void>
}

export default IUserAnswerStatisticRepository
