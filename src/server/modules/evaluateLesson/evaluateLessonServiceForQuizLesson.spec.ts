import { container } from 'server/container'
import { LessonUserAnswer } from 'server/entities/lessonUserAnswer'
import { createCourse } from 'server/tests/utils/createCourse'
import { createQuizLesson } from 'server/tests/utils/createQuizLesson'
import EvaluateLessonService from './evaluateLessonService'

beforeAll(async () => {
  const { courseRepository } = container()
  const quizLesson = createQuizLesson()

  await courseRepository.save(
    createCourse({
      lessons: [quizLesson.lesson()],
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

describe('Evaluate Lesson Service [quiz lesson]', () => {
  const baseLessonUserAnswer: Omit<LessonUserAnswer, 'answer'> = {
    courseId: 'course-1',
    moduleId: 'course-1-module-1',
    lessonId: 'course-1-module-1-quiz-1',
  }

  it('Should evaluate quiz lesson as correct', async () => {
    const { courseRepository } = container()
    const evaluateLessonService = new EvaluateLessonService(courseRepository)
    const quizLesson = createQuizLesson()

    const { correct } = await evaluateLessonService.execute({
      ...baseLessonUserAnswer,
      answer: quizLesson.correctAnswer(),
    })

    expect(correct).toBe(true)
  })

  it('Should evaluate quiz lesson as incorrect [wrong alternative selected]', async () => {
    const { courseRepository } = container()
    const evaluateLessonService = new EvaluateLessonService(courseRepository)
    const quizLesson = createQuizLesson()

    const { correct } = await evaluateLessonService.execute({
      ...baseLessonUserAnswer,
      answer: quizLesson.wrongAlternativeSelected(),
    })

    expect(correct).toBe(false)
  })

  it('Should evaluate quiz lesson as incorrect [missing correct alternative]', async () => {
    const { courseRepository } = container()
    const evaluateLessonService = new EvaluateLessonService(courseRepository)
    const quizLesson = createQuizLesson()

    const { correct } = await evaluateLessonService.execute({
      ...baseLessonUserAnswer,
      answer: quizLesson.missingCorrectAlternative(),
    })

    expect(correct).toBe(false)
  })
})
