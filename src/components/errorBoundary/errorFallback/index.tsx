import UserNotAuthenticated from '../userNotAuthenticated'

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  switch (error.message) {
    case 'User not authenticated':
      return <UserNotAuthenticated resetErrorBoundary={resetErrorBoundary} />
    case 'User not found':
      return <UserNotAuthenticated resetErrorBoundary={resetErrorBoundary} />
    default:
      return (
        <div role="alert">
          <p>Error</p>
          <pre>{error.message}</pre>
        </div>
      )
  }
}

export default ErrorFallback
