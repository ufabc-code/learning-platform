import IAuthProvider from './iAuthProvider'

class FakeAuthProvider implements IAuthProvider {
  async check({ token }: { email: string; token: string }): Promise<boolean> {
    return token === 'validToken'
  }
}

export default FakeAuthProvider
