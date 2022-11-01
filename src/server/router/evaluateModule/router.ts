import { CodeUserAnswer } from 'server/entities/codeUserAnswer'
import { UserAnswer } from 'server/entities/lessonUserAnswer'
import { QuizUserAnswer } from 'server/entities/quizUserAnswer'
import { evaluateModuleFactory } from 'server/modules/evaluateModule/evaluateModuleFactory'
import { z } from 'zod'
import { createRouter } from '../context'
import { LessonUserAnswerSchema } from './schemas/lessonUserAnswerSchema'

type Answer = z.infer<typeof LessonUserAnswerSchema.shape.answer>

function parseAnswer(answer: Answer): UserAnswer {
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

const LessonStatistic = z.object({
  attempts: z.number(),
  answer: LessonUserAnswerSchema
})

export const evaluateModule = createRouter().mutation('evaluate', {
  input: z.array(LessonStatistic),
  resolve: async ({ input: lessonStatistics, ctx }) => {
    const { user } = ctx
    return await evaluateModuleFactory().execute({
      user,
      lessonStatistics: lessonStatistics.map((lessonStatistic) => ({
        attempts: lessonStatistic.attempts,
        answer: {
          ...lessonStatistic.answer,
          answer: parseAnswer(lessonStatistic.answer.answer)
        }
      }))
    })
  }
})
