import { z } from 'zod'

export const CodeUserAnswerSchema = z.object({
  code: z.string(),
  language: z.string()
})
