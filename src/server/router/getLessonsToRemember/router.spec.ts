import { AppRouter } from '..'
import { createTRPCClient } from '@trpc/client'
import { addFetch } from 'server/tests/utils/addFetch'
import { container } from 'server/container'
import GetLessonsToRememberService from 'server/modules/getLessonsToRemember/getLessonsToRememberService'
import User from 'server/entities/user'

function getClient(headers?: Record<string, string>) {
  addFetch(global)
  return createTRPCClient<AppRouter>({
    url: 'http://localhost:3000/api/trpc',
    headers,
  })
}

async function createUser(client: ReturnType<typeof getClient>) {
  await client.mutation('users.create', {
    email: 'user@user.com',
  })

  return await client.query('users.signIn', {
    email: 'user@user.com',
    provider: 'fake-auth-provider',
    token: 'validToken',
  })
}

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
  it('Should be able to get lessons to remember [always same order] as valid user', async () => {
    const userToken = await createUser(getClient())
    const authorizedClient = getClient({
      Authorization: `Bearer ${userToken}`,
    })

    const { userAnswerStatisticRepository, userRepository } = container()
    const userAnswerStatistics = getUserAnswerStatistics()

    for (const userAnswerStatistic of userAnswerStatistics) {
      await userAnswerStatisticRepository.save(userAnswerStatistic)
    }

    const getLessonsToRememberService = new GetLessonsToRememberService(
      userAnswerStatisticRepository,
    )

    const lessonsToRememberTarget = await getLessonsToRememberService.execute({
      user: (await userRepository.findByEmail('user@user.com')) as User,
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

      const lessonsToRemember = await authorizedClient.query(
        'lessonsToRemember.get',
        {
          courseId: 'courseId',
        },
      )

      expect(lessonsToRemember).toEqual(
        expect.arrayContaining(lessonsToRememberTarget),
      )
    }
  })
})
