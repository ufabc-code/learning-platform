import { z } from 'zod'

export const LessonSchema = z.object({
  id: z.string(),
  type: z.enum(['code', 'quiz'])
})
