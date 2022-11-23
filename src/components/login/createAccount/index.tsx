import { trpc } from 'utils/trpc'

interface CreateAccountProps {
  email: string
  setEmail: (email: string) => void
  setPage: (page: 'login' | 'create-account') => void
}

function CreateAccount({ email, setEmail, setPage }: CreateAccountProps) {
  const { mutate: createUser } = trpc.useMutation('users.create')

  function handleCreateAccount() {
    createUser(
      {
        email,
      },
      {
        onSuccess: () => {
          setPage('login')
        },
      },
    )
  }

  return (
    <div className="w-96 rounded-lg bg-white shadow-lg">
      <div className="space-y-4 p-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
          Criar Conta
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
            onClick={handleCreateAccount}
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  )
}
export default CreateAccount
