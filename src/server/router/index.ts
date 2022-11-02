import { courses } from './courses/router'
import { createRouter } from './context'

export const appRouter = createRouter().merge('courses.', courses)

export type AppRouter = typeof appRouter
