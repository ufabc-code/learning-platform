import { Request, Response } from 'express'
import { NextApiRequest, NextApiResponse } from 'next'
import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import User from 'server/entities/user'
import { authMiddleware } from './middlewares/authMiddleware'

export type CreateContextOptions = {
  req: NextApiRequest | Request
  res: NextApiResponse | Response
  user: User | null
}

export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    ...opts,
  }
}

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions,
) => {
  const { req, res } = opts
  const ctx: CreateContextOptions = {
    req,
    res,
    user: null,
  }
  authMiddleware(ctx)
  return await createContextInner(ctx)
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
