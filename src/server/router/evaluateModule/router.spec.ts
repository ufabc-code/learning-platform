import { AppRouter } from '..'
import { createTRPCClient } from '@trpc/client'
import { container } from 'server/container'
import { addFetch } from 'server/tests/utils/addFetch'
import { createCourse } from 'server/tests/utils/createCourse'
import { createQuizLesson } from 'server/tests/utils/createQuizLesson'
import { LessonUserAnswer } from 'server/entities/lessonUserAnswer'

function getClient(headers?: Record<string, string>) {
  addFetch(global)
  return createTRPCClient<AppRouter>({
    url: 'http://localhost:3000/api/trpc',
    headers
  })
}

beforeAll(async () => {
  const { courseRepository } = container()
  const quizLesson = createQuizLesson()

  await courseRepository.save(
    createCourse({
      lessons: [quizLesson.lesson()]
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
  const { userAnswerStatisticRepository, userRepository } = container()
  await userAnswerStatisticRepository.clear()
  await userRepository.clear()
})

async function createUser(client: ReturnType<typeof getClient>) {
  await client.mutation('users.create', {
    email: 'user@user.com'
  })

  return await client.query('users.signIn', {
    email: 'user@user.com',
    provider: 'fake-auth-provider',
    token: 'validToken'
  })
}

describe('Evaluate Module Service', () => {
  const baseQuizLessonUserAnswer: Omit<LessonUserAnswer, 'answer'> = {
    courseId: 'course-1',
    moduleId: 'course-1-module-1',
    lessonId: 'course-1-module-1-quiz-1'
  }

  it('Should evaluate a module as a valid user', async () => {
    const userToken = await createUser(getClient())
    const authorizedClient = getClient({
      Authorization: `Bearer ${userToken}`
    })

    const quizLesson = createQuizLesson()

    const { correct } = await authorizedClient.mutation(
      'evaluateModule.evaluate',
      [
        {
          attempts: 1,
          answer: {
            ...baseQuizLessonUserAnswer,
            answer: quizLesson.correctAnswer()
          }
        }
      ]
    )

    expect(correct).toBe(true)
  })

  it('Should evaluate a module as an invalid user', async () => {
    const userToken = await createUser(getClient())
    const authorizedClient = getClient({
      Authorization: `Bearer ${userToken}-invalid`
    })

    const quizLesson = createQuizLesson()

    await expect(async () => {
      await authorizedClient.mutation('evaluateModule.evaluate', [
        {
          attempts: 1,
          answer: {
            ...baseQuizLessonUserAnswer,
            answer: quizLesson.correctAnswer()
          }
        }
      ])
    }).rejects.toThrow('Invalid token')
  })
})
