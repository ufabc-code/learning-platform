import { z } from 'zod'

export const RunCodeSchema = z.object({
  code: z.string(),
  input: z.string(),
  language: z.string(),
})
