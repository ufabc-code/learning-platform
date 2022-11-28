import { container } from 'server/container'
import GetUserStatisticsService from './getUserStatisticsService'

export const getUserStatisticsFactory = () => {
  const { userAnswerStatisticRepository } = container()
  return new GetUserStatisticsService(userAnswerStatisticRepository)
}
