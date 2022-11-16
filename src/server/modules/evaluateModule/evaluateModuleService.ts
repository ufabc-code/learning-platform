import { LessonUserAnswer } from 'server/entities/lessonUserAnswer'
import User from 'server/entities/user'
import UserAnswerStatistic from 'server/entities/userAnswerStatistic'
import EvaluateLessonService from 'server/modules/evaluateLesson/evaluateLessonService'
import IUserAnswerStatisticRepository from 'server/repositories/iUserAnswerStatisticRepository'

export interface UserModuleAnswer {
  user: User | null
  lessonStatistics: Array<{
    attempts: number
    answer: LessonUserAnswer
  }>
}

class EvaluateModuleService {
  constructor(
    private evaluateLessonService: EvaluateLessonService,
    private userAnswerStatisticRepository: IUserAnswerStatisticRepository,
  ) {}

  async execute({ user, lessonStatistics }: UserModuleAnswer) {
    if (!user) {
      throw new Error('User not authenticated')
    }

    const lessonResults = await Promise.all(
      lessonStatistics.map(({ answer }) => {
        return this.evaluateLessonService.execute(answer)
      }),
    )

    if (lessonResults.some((lessonResult) => !lessonResult.correct)) {
      return {
        correct: false,
        message: 'Not all lessons are correct',
      }
    }

    for (const { attempts, answer } of lessonStatistics) {
      await this.userAnswerStatisticRepository.save(
        new UserAnswerStatistic({
          userId: user.id,
          courseId: answer.courseId,
          moduleId: answer.moduleId,
          lessonId: answer.lessonId,
          updatedAt: new Date(),
          attempts,
        }),
      )
    }

    return {
      correct: true,
    }
  }
}

export default EvaluateModuleService
