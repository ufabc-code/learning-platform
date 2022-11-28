import User from 'server/entities/user'
import IUserAnswerStatisticRepository from 'server/repositories/iUserAnswerStatisticRepository'

class GetLessonsToRememberService {
  constructor(
    private userAnswerStatisticRepository: IUserAnswerStatisticRepository,
  ) {}

  async execute({ user, courseId }: { user: User | null; courseId: string }) {
    if (!user) {
      throw new Error('User not found')
    }

    const userAnswerStatistics =
      await this.userAnswerStatisticRepository.findByUserAndCourse({
        userId: user.id,
        courseId,
      })
      
    userAnswerStatistics.sort((a, b) => {
      if (a.attempts !== b.attempts) {
        return b.attempts - a.attempts
      }
      if (a.updatedAt.getTime() !== b.updatedAt.getTime()) {
        return b.updatedAt.getTime() - a.updatedAt.getTime()
      }
      if (a.lessonId < b.lessonId) {
        return -1
      }
      if (a.lessonId > b.lessonId) {
        return 1
      }
      return 0
    })
    

    const lessonsToRemember = userAnswerStatistics
      .slice(0, 10)
      .map((userAnswerStatistic) => {
        return {
          courseId,
          lessonId: userAnswerStatistic.lessonId,
          moduleId: userAnswerStatistic.moduleId,
        }
      })

    return lessonsToRemember
  }
}

export default GetLessonsToRememberService
