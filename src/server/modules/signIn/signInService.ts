import { sign } from 'jsonwebtoken'
import User from 'server/entities/user'
import IAuthProvider from 'server/providers/authProviders/iAuthProvider'
import IUserRepository from 'server/repositories/iUserRepository'

class SignInService {
  constructor(
    private userRepository: IUserRepository,
    private authProviders: Record<string, IAuthProvider>
  ) {}

  async signIn({
    email,
    provider,
    token
  }: {
    email: string
    provider: string
    token: string
  }) {
    const authProvider = this.getAuthProvider(provider)
    const isValid = await authProvider.check({ email, token })

    if (!isValid) {
      throw new Error('Invalid token')
    }

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    return this.getJWT(user)
  }

  private getJWT(user: User) {
    // TODO: set a secret key in a .env file
    const SECRET_KEY = 'SECRET_KEY'
    const token = sign(
      {
        email: user.email,
        id: user.id
      },
      SECRET_KEY,
      {
        expiresIn: '30d'
      }
    )
    return token
  }

  getAuthProvider(provider: string) {
    const authProvider = this.authProviders[provider]
    if (!authProvider) {
      throw new Error('Invalid provider')
    }
    return authProvider
  }
}

export default SignInService
