import { container } from 'server/container'
import { LessonUserAnswer } from 'server/entities/lessonUserAnswer'
import { createCodeLesson } from 'server/tests/utils/createCodeLesson'
import { createCourse } from 'server/tests/utils/createCourse'
import EvaluateLessonService from './evaluateLessonService'

beforeEach(async () => {
  const { courseRepository } = container()
  const codeLesson = createCodeLesson()

  await courseRepository.save(
    createCourse({
      lessons: [codeLesson.lesson()]
    })
  )
})

afterEach(async () => {
  const { courseRepository } = container()
  const courses = await courseRepository.getAll()
  await Promise.all(
    courses.map(async (course) => await courseRepository.delete(course.id))
  )
})

describe('Evaluate Lesson Service [code lesson]', () => {
  const baseLessonUserAnswer: Omit<LessonUserAnswer, 'answer'> = {
    courseId: 'course-1',
    moduleId: 'course-1-module-1',
    lessonId: 'course-1-module-1-code-1'
  }

  it('Should evaluate code lesson as correct', async () => {
    const { courseRepository } = container()

    const validateLessonService = new EvaluateLessonService(courseRepository)
    const codeLesson = createCodeLesson()

    const result = await validateLessonService.execute({
      ...baseLessonUserAnswer,
      answer: codeLesson.correctAnswer()
    })

    expect(result.correct).toBe(true)
  })

  describe('Should evaluate code lesson as incorrect', () => {
    it('Should evaluate code lesson as incorrect when some test case fail [wrong answer]', async () => {
      const { courseRepository } = container()

      const validateLessonService = new EvaluateLessonService(courseRepository)
      const codeLesson = createCodeLesson()

      const result = await validateLessonService.execute({
        ...baseLessonUserAnswer,
        answer: codeLesson.wrongAnswer()
      })

      expect(result.correct).toBe(false)
    })

    it('Should evaluate code lesson as incorrect when some test case fail [error]', async () => {
      const { courseRepository } = container()

      const validateLessonService = new EvaluateLessonService(courseRepository)
      const codeLesson = createCodeLesson()

      const result = await validateLessonService.execute({
        ...baseLessonUserAnswer,
        answer: codeLesson.errorAnswer()
      })

      expect(result.correct).toBe(false)
      expect(result.message).toBe('Execution error')
    })

    it('Should evaluate code lesson as incorrect when some test case fail [timeout]', async () => {
      const { courseRepository } = container()

      const validateLessonService = new EvaluateLessonService(courseRepository)
      const codeLesson = createCodeLesson()

      const result = await validateLessonService.execute({
        ...baseLessonUserAnswer,
        answer: codeLesson.timeoutAnswer()
      })

      expect(result.correct).toBe(false)
      expect(result.message).toBe('Execution timeout')
    })
  })
})
