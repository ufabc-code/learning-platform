import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'

interface SignInProps {
  email: string
  setEmail: (email: string) => void
  setPage: (page: 'login' | 'create-account') => void
}

function SignIn({ email, setEmail, setPage }: SignInProps) {
  const router = useRouter()

  const client = trpc.createClient({
    url: '/api/trpc',
  })

  async function handleLogin() {
    const token = await client.query('users.signIn', {
      email,
      provider: 'fake-auth-provider',
      token: 'validToken',
    })
    localStorage.setItem('token', token)
    router.push('/')
  }

  return (
    <div className="w-96 rounded-lg bg-white shadow-lg">
      <div className="space-y-4 p-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
          Entrar
        </h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={handleLogin}
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
          >
            Entrar
          </button>
        </div>
        <p className="text-sm font-light text-gray-500">
          Não tem uma conta?
          <button
            onClick={() => setPage('create-account')}
            className="ml-2 font-medium text-blue-600 hover:underline"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  )
}
export default SignIn
