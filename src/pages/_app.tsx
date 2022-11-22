import { trpc, client } from 'utils/trpc'
import { QueryClientProvider } from 'react-query'
import { ToastProvider, ToastSection } from 'components/toast'
import '../styles/globals.css'
import { AppType } from 'next/app'

const MyApp: AppType = ({
  Component,
  pageProps,
}) => {
  const trpcClient = trpc.createClient({
    url: '/api/trpc',
    headers() {
      const token = localStorage.getItem('token') || ''
      return {
        Authorization: `Bearer ${token}`,
      }
    },
  })
  return (
    <ToastProvider>
      <ToastSection />
      <trpc.Provider client={trpcClient} queryClient={client}>
        <QueryClientProvider client={client}>
            <Component {...pageProps} />
        </QueryClientProvider>
      </trpc.Provider>
    </ToastProvider>
  )
}

export default MyApp
