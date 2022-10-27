import User from 'server/entities/user'
import { AppContextOptions } from '../context'
import { verify } from 'jsonwebtoken'

interface IPayload {
  email: string
  id: string
}

export function authMiddleware(ctx: AppContextOptions, next: () => void) {
  const SECRET_KEY = 'SECRET_KEY'

  const { req } = ctx
  const authorization = req.headers.authorization || ''
  const [, token] = authorization.split(' ')

  if (!token) {
    ctx.user = null
    return next()
  }

  try {
    const decoded = verify(token || '', SECRET_KEY) as IPayload
    ctx.user = new User({ id: decoded.id, email: decoded.email })
    return next()
  } catch (error) {
    ctx.user = null
    throw new Error('Invalid token')
  }
}
