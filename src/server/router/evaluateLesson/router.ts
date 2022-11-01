import { evaluateLessonFactory } from 'server/modules/evaluateLesson/evaluateLessonFactory'
import { LessonUserAnswerSchema } from './schemas/lessonUserAnswerSchema'
import { QuizUserAnswer } from 'server/entities/quizUserAnswer'
import { CodeUserAnswer } from 'server/entities/codeUserAnswer'
import { createRouter } from '../context'
import { z } from 'zod'

type Answer = z.infer<typeof LessonUserAnswerSchema.shape.answer>

function parseAnswer(answer: Answer): CodeUserAnswer | QuizUserAnswer {
  if ('code' in answer) {
    return new CodeUserAnswer({
      ...answer
    })
  }

  if ('alternatives' in answer) {
    return new QuizUserAnswer({
      ...answer
    })
  }
  throw new Error('Invalid answer')
}

export const evaluateLesson = createRouter().query('evaluate', {
  input: LessonUserAnswerSchema,
  resolve: async ({ input }) => {
    const { courseId, moduleId, lessonId, answer } = input
    return await evaluateLessonFactory().execute({
      courseId,
      moduleId,
      lessonId,
      answer: parseAnswer(answer)
    })
  }
})
