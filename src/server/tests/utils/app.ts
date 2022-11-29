import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import { appRouter } from 'server/router'
import { createContext } from 'server/router/context'
import { Request, Response } from 'express'

const app = express()
app.use(express.json())

app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: async ({ req, res }) => {
      return createContext({
        req: req as Request,
        res: res as Response,
        user: null,
      })
    },
  }),
)

export { app }
