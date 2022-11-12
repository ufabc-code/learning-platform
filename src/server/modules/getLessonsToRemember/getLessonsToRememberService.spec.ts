import { container } from 'server/container'
import User from 'server/entities/user'
import GetLessonsToRememberService from './getLessonsToRememberService'

function getUserAnswerStatistics() {
  const N = 40
  const userAnswerStatistics = []

  for (let i = 0; i < N; i++) {
    userAnswerStatistics.push({
      attempts: Math.floor(Math.random() * 3) + 1,
      courseId: 'courseId',
      lessonId: `lessonId${i}`,
      moduleId: 'moduleId',
      updatedAt: new Date(Math.floor(Math.random() * 2) + 1),
      userId: 'user-id',
    })
  }

  return userAnswerStatistics
}

describe('Get Lessons To Remember Service', () => {
  it('Should be able to get lessons to remember [always same order]', async () => {
    const user = new User({
      email: 'user@user.com',
      id: 'user-id',
    })

    const { userAnswerStatisticRepository } = container()
    const userAnswerStatistics = getUserAnswerStatistics()

    for (const userAnswerStatistic of userAnswerStatistics) {
      await userAnswerStatisticRepository.save(userAnswerStatistic)
    }

    const getLessonsToRememberService = new GetLessonsToRememberService(
      userAnswerStatisticRepository,
    )

    const lessonsToRememberTarget = await getLessonsToRememberService.execute({
      user,
      courseId: 'courseId',
    })

    // running 40 times to ensure that the order is always the same [statistically unlikely false positive]
    let N = 40

    while (N--) {
      userAnswerStatisticRepository.clear()

      const shuffledUserAnswerStatistics = userAnswerStatistics.sort(
        () => 0.5 - Math.random(),
      )

      for (const userAnswerStatistic of shuffledUserAnswerStatistics) {
        await userAnswerStatisticRepository.save(userAnswerStatistic)
      }

      const lessonsToRemember = await getLessonsToRememberService.execute({
        user,
        courseId: 'courseId',
      })

      expect(lessonsToRemember).toEqual(
        expect.arrayContaining(lessonsToRememberTarget),
      )
    }
  })
})
