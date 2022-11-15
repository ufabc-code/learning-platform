import * as trpc from '@trpc/server'
import { inferAsyncReturnType } from '@trpc/server'
import User from 'server/entities/user'
import { Request, Response } from 'express'
import { NextApiRequest, NextApiResponse } from 'next'
import { authMiddleware } from './middlewares/authMiddleware'

export type AppContextOptions = {
  req: NextApiRequest | Request
  res: NextApiResponse | Response
  user: User | null
}

export async function createContext(opts: AppContextOptions) {
  return {
    ...opts
  }
}

type Context = inferAsyncReturnType<typeof createContext>

export const createRouter = () =>
  trpc.router<Context>().middleware(async ({ ctx, next }) => {
    authMiddleware(ctx, next)
    return next()
  })
