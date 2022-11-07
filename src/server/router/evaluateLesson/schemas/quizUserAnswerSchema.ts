import { z } from 'zod'

export const QuizUserAnswerSchema = z.object({
  alternatives: z.array(z.number())
})
