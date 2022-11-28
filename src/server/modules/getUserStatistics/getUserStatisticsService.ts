import User from 'server/entities/user'
import IUserAnswerStatisticRepository from 'server/repositories/iUserAnswerStatisticRepository'

class GetUserStatisticsService {
  constructor(
    private userAnswerStatisticRepository: IUserAnswerStatisticRepository,
  ) {}

  async execute({ user }: { user: User | null }) {
    if (!user) {
      throw new Error('User not authenticated')
    }
    const userAnswerStatistics =
      await this.userAnswerStatisticRepository.findAllByUserId(user.id)

    return userAnswerStatistics
  }
}

export default GetUserStatisticsService
