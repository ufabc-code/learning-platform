import { container } from 'server/container'
import GetLessonsToRememberService from './getLessonsToRememberService'

export const getLessonsToRememberFactory = () => {
  const { userAnswerStatisticRepository } = container()
  return new GetLessonsToRememberService(userAnswerStatisticRepository)
}
