import { z } from 'zod'
import { ModuleSchema } from './moduleSchema'

export const CourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  modules: z.array(ModuleSchema),
  slug: z.string()
})
