import { z } from 'zod'
import { CodeUserAnswerSchema } from './codeUserAnswerSchema'
import { QuizUserAnswerSchema } from './quizUserAnswerSchema'

export const LessonUserAnswerSchema = z.object({
  courseId: z.string(),
  moduleId: z.string(),
  lessonId: z.string(),
  answer: z.union([CodeUserAnswerSchema, QuizUserAnswerSchema])
})
