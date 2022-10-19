import { z } from 'zod'

export const CodeLessonSchema = z.object({
  id: z.string(),
  type: z.union([z.literal('code'), z.literal('quiz')]),
  solution: z.object({
    text: z.string(),
    code: z.string(),
    language: z.string()
  }),
  template: z.object({ code: z.string(), language: z.string() }),
  tests: z.array(z.object({ input: z.string(), expected: z.string() })),
  text: z.string()
})

export const QuizLessonSchema = z.object({
  id: z.string(),
  type: z.union([z.literal('code'), z.literal('quiz')]),
  text: z.string(),
  alternatives: z.array(
    z.object({
      text: z.string()
    })
  ),
  solution: z.object({
    text: z.string(),
    correct: z.array(z.number())
  })
})

export const LessonSchema = z.union([CodeLessonSchema, QuizLessonSchema])
