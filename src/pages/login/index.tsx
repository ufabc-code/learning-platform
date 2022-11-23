import CreateAccount from 'components/login/createAccount'
import SignIn from 'components/login/signIn'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [page, setPage] = useState<'login' | 'create-account'>('login')

  return (
    <div className="flex h-screen items-center justify-center">
      {page === 'login' && (
        <SignIn email={email} setEmail={setEmail} setPage={setPage} />
      )}

      {page === 'create-account' && (
        <CreateAccount email={email} setEmail={setEmail} setPage={setPage} />
      )}
    </div>
  )
}
