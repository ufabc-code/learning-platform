import { z } from 'zod'
import { LessonSchema } from './lessonSchema'

export const ModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  lessons: z.array(LessonSchema)
})
