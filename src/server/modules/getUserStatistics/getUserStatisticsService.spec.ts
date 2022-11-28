import { container } from 'server/container'
import { LessonUserAnswer } from 'server/entities/lessonUserAnswer'
import User from 'server/entities/user'
import { createCodeLesson } from 'server/tests/utils/createCodeLesson'
import { createCourse } from 'server/tests/utils/createCourse'
import { createQuizLesson } from 'server/tests/utils/createQuizLesson'
import EvaluateLessonService from '../evaluateLesson/evaluateLessonService'
import EvaluateModuleService from '../evaluateModule/evaluateModuleService'
import GetUserStatisticsService from './getUserStatisticsService'

beforeAll(async () => {
  const { courseRepository } = container()
  const codeLesson = createCodeLesson()
  const quizLesson = createQuizLesson()

  await courseRepository.save(
    createCourse({
      lessons: [codeLesson.lesson(), quizLesson.lesson()],
    }),
  )
})

afterAll(async () => {
  const { courseRepository } = container()
  const courses = await courseRepository.getAll()
  await Promise.all(
    courses.map(async (course) => await courseRepository.delete(course.id)),
  )
})

beforeEach(async () => {
  const { userAnswerStatisticRepository } = container()
  await userAnswerStatisticRepository.clear()
})

describe('Get User Statistics Service', () => {
  const baseQuizLessonUserAnswer: Omit<LessonUserAnswer, 'answer'> = {
    courseId: 'course-1',
    moduleId: 'course-1-module-1',
    lessonId: 'course-1-module-1-quiz-1',
  }
  const quizLesson = createQuizLesson()

  it("Should return the user's statistics", async () => {
    const { courseRepository, userAnswerStatisticRepository } = container()
    const user1 = new User({ id: 'user-1', email: 'user1@email.com' })
    const user2 = new User({ id: 'user-2', email: 'user2@email.com' })

    expect((await userAnswerStatisticRepository.getAll()).length).toBe(0)

    const evaluateModuleService = new EvaluateModuleService(
      new EvaluateLessonService(courseRepository),
      userAnswerStatisticRepository,
    )

    await evaluateModuleService.execute({
      user: user1,
      lessonStatistics: [
        {
          attempts: 1,
          answer: {
            ...baseQuizLessonUserAnswer,
            answer: quizLesson.correctAnswer(),
          },
        },
      ],
    })

    await evaluateModuleService.execute({
      user: user2,
      lessonStatistics: [
        {
          attempts: 2,
          answer: {
            ...baseQuizLessonUserAnswer,
            answer: quizLesson.correctAnswer(),
          },
        },
      ],
    })

    expect((await userAnswerStatisticRepository.getAll()).length).toBe(2)

    const getUserStatisticsService = new GetUserStatisticsService(
      userAnswerStatisticRepository,
    )

    expect(
      (await getUserStatisticsService.execute({ user: user1 })).length,
    ).toBe(1)

    expect(
      (await getUserStatisticsService.execute({ user: user2 })).length,
    ).toBe(1)
  })
})
