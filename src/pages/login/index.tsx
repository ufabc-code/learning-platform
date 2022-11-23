import { useRouter } from 'next/router'
import { useState } from 'react'
import { trpc } from 'utils/trpc'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const { mutate: createUser } = trpc.useMutation('users.create')
  const client = trpc.createClient({
    url: '/api/trpc',
  })

  function handleCreateAccount() {
    createUser(
      {
        email,
      },
      {
        onSuccess: () => {
          alert('Account created!')
        },
      },
    )
  }

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
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-md border p-8 shadow-md">
        <h1>Entrar</h1>
        <input
          className="rounded-md border-2 border-blue-600 p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={() => handleLogin()} className="bg-red-500 p-4">
          Entrar
        </button>
      </div>
      <div className="rounded-md border p-8 shadow-md">
        <h1>Cadastrar</h1>
        <input
          className="rounded-md border-2 border-blue-600 p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleCreateAccount} className="bg-red-500 p-4">
          Cadastrar
        </button>
      </div>
    </div>
  )
}
