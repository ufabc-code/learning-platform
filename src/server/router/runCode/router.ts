import { runCodeFactory } from 'server/modules/runCode/runCodeFactory'
import { createRouter } from '../context'
import { RunCodeSchema } from './schemas/runCodeSchema'

export const runCode = createRouter().mutation('run', {
  input: RunCodeSchema,
  resolve: async ({ input }) => {
    return await runCodeFactory().execute({
      code: input.code,
      input: input.input,
      language: input.language,
    })
  },
})
