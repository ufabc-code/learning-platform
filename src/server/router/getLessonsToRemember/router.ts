import { z } from 'zod'
import { getLessonsToRememberFactory } from './../../modules/getLessonsToRemember/getLessonsToRememberFactory'
import { createRouter } from './../context'

export const getLessonsToRemember = createRouter().query('get', {
  input: z.object({
    courseId: z.string(),
  }),
  resolve: async ({ input, ctx }) => {
    const { courseId } = input
    const { user } = ctx
    return await getLessonsToRememberFactory().execute({
      courseId,
      user,
    })
  },
})
