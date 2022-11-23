import { createUserFactory } from 'server/modules/createUser/createUserFactory'
import { signInFactory } from 'server/modules/signIn/signInFactory'
import { z } from 'zod'
import { createRouter } from './../context'

export const users = createRouter()
  .mutation('create', {
    input: z.object({
      email: z.string()
    }),
    resolve: async ({ input }) => {
      const { email } = input
      await createUserFactory().execute({ email })
    }
  })
  .query('signIn', {
    input: z.object({
      email: z.string(),
      provider: z.string(),
      token: z.string()
    }),
    resolve: async ({ input }) => {
      const { email, provider, token } = input
      return await signInFactory().signIn({ email, provider, token })
    }
  })
