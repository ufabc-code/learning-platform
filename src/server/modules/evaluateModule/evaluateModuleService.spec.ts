import { container } from 'server/container'
import EvaluateModuleService from './evaluateModuleService'
import EvaluateLessonService from '../evaluateLesson/evaluateLessonService'
import User from 'server/entities/user'
import { createCodeLesson } from 'server/tests/utils/createCodeLesson'
import { createQuizLesson } from 'server/tests/utils/createQuizLesson'
import { createCourse } from 'server/tests/utils/createCourse'
import { LessonUserAnswer } from 'server/entities/lessonUserAnswer'

beforeAll(async () => {
  const { courseRepository } = container()
  const codeLesson = createCodeLesson()
  const quizLesson = createQuizLesson()

  await courseRepository.save(
    createCourse({
      lessons: [codeLesson.lesson(), quizLesson.lesson()]
    })
  )
})

afterAll(async () => {
  const { courseRepository } = container()
  const courses = await courseRepository.getAll()
  await Promise.all(
    courses.map(async (course) => await courseRepository.delete(course.id))
  )
})

beforeEach(async () => {
  const { userAnswerStatisticRepository } = container()
  await userAnswerStatisticRepository.clear()
})

describe('Evaluate Module Service', () => {
  const baseCodeLessonUserAnswer: Omit<LessonUserAnswer, 'answer'> = {
    courseId: 'course-1',
    moduleId: 'course-1-module-1',
    lessonId: 'course-1-module-1-code-1'
  }

  const baseQuizLessonUserAnswer: Omit<LessonUserAnswer, 'answer'> = {
    courseId: 'course-1',
    moduleId: 'course-1-module-1',
    lessonId: 'course-1-module-1-quiz-1'
  }

  it('should evaluate a module as correct ', async () => {
    const { courseRepository, userAnswerStatisticRepository } = container()

    const evaluateModuleService = new EvaluateModuleService(
      new EvaluateLessonService(courseRepository),
      userAnswerStatisticRepository
    )

    const user = new User({ id: 'user-id', email: 'user@user.com' })
    const codeLesson = createCodeLesson()
    const quizLesson = createQuizLesson()

    expect((await userAnswerStatisticRepository.getAll()).length).toBe(0)
    const { correct } = await evaluateModuleService.execute({
      user,
      lessonStatistics: [
        {
          attempts: 1,
          answer: {
            ...baseCodeLessonUserAnswer,
            answer: codeLesson.correctAnswer()
          }
        },
        {
          attempts: 1,
          answer: {
            ...baseQuizLessonUserAnswer,
            answer: quizLesson.correctAnswer()
          }
        }
      ]
    })

    expect(correct).toBe(true)
    expect((await userAnswerStatisticRepository.getAll()).length).toBe(2)
  })

  it('should evaluate a module as incorrect ', async () => {
    const { courseRepository, userAnswerStatisticRepository } = container()

    const evaluateModuleService = new EvaluateModuleService(
      new EvaluateLessonService(courseRepository),
      userAnswerStatisticRepository
    )

    const user = new User({ id: 'user-id', email: 'user@user.com' })
    const codeLesson = createCodeLesson()
    const quizLesson = createQuizLesson()

    expect((await userAnswerStatisticRepository.getAll()).length).toBe(0)
    const { correct } = await evaluateModuleService.execute({
      user,
      lessonStatistics: [
        {
          attempts: 1,
          answer: {
            ...baseCodeLessonUserAnswer,
            answer: codeLesson.wrongAnswer()
          }
        },
        {
          attempts: 1,
          answer: {
            ...baseQuizLessonUserAnswer,
            answer: quizLesson.wrongAnswer()
          }
        }
      ]
    })

    expect(correct).toBe(false)
    expect((await userAnswerStatisticRepository.getAll()).length).toBe(0)
  })
})
