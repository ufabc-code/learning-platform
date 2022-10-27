import { courses } from './courses/router'
import { createRouter } from './context'
import { evaluateLesson } from './evaluateLesson/router'
import { evaluateModule } from './evaluateModule/router'
import { users } from './users/router'

export const appRouter = createRouter()
  .merge('courses.', courses)
  .merge('evaluateLesson.', evaluateLesson)
  .merge('evaluateModule.', evaluateModule)
  .merge('users.', users)

export type AppRouter = typeof appRouter
