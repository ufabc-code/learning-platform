import { SessionProvider } from 'next-auth/react'
import type { AppType } from 'next/app'
import type { Session } from 'next-auth'
import { trpc, client } from 'utils/trpc'
import { QueryClientProvider } from 'react-query'
import { ToastProvider, ToastSection } from 'components/toast'
import '../styles/globals.css'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  const trpcClient = trpc.createClient({
    url: '/api/trpc',
    headers() {
      const token = localStorage.getItem('token') || ''
      return {
        Authorization: `Bearer ${token}`
      }
    }
  })
  return (
    <ToastProvider>
      <ToastSection />
      <trpc.Provider client={trpcClient} queryClient={client}>
        <QueryClientProvider client={client}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </ToastProvider>
  )
}

export default MyApp
