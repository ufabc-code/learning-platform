import { Button } from 'flowbite-react'

function UserNotAuthenticated({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void
}) {
  function handleLogin() {
    // router doesn't work here
    location.href = '/login'
    resetErrorBoundary()
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <h1 className="mb-16 text-4xl font-medium">Usuário não autenticado</h1>
        <Button onClick={handleLogin} className="mx-auto px-4">
          Entrar
        </Button>
      </div>
    </div>
  )
}

export default UserNotAuthenticated
