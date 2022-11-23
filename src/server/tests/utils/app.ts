import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import { appRouter } from 'server/router'
import { createContext } from 'server/router/context'

const app = express()
app.use(express.json())

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: async ({ req, res }) => {
      return createContext({ req, res, user: null })
    }
  })
)

export { app }
