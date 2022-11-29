import { courses } from './courses/router'
import { createRouter } from './context'
import { evaluateLesson } from './evaluateLesson/router'
import { evaluateModule } from './evaluateModule/router'
import { users } from './users/router'
import { runCode } from './runCode/router'
import { getLessonsToRemember } from './getLessonsToRemember/router'
import { userStatistics } from './getUserStatistics/routes'

export const appRouter = createRouter()
  .merge('courses.', courses)
  .merge('evaluateLesson.', evaluateLesson)
  .merge('evaluateModule.', evaluateModule)
  .merge('users.', users)
  .merge('runCode.', runCode)
  .merge('lessonsToRemember.', getLessonsToRemember)
  .merge('userStatistics.', userStatistics)

export type AppRouter = typeof appRouter
