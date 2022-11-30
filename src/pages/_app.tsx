import { trpc, client } from 'utils/trpc'
import { QueryClientProvider } from 'react-query'
import { ToastProvider, ToastSection } from 'components/toast'
import '../styles/globals.css'
import { AppType } from 'next/app'
import Head from 'next/head'
import Header from 'components/header'
import Footer from 'components/footer'
import UserProvider from 'providers/user'

const MyApp: AppType = ({ Component, pageProps }) => {
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
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Learning Platform</title>
      </Head>
      <UserProvider>
        <ToastProvider>
          <ToastSection />
          <trpc.Provider client={trpcClient} queryClient={client}>
            <QueryClientProvider client={client}>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-grow">
                  <Component {...pageProps} />
                </main>
                <Footer />
              </div>
            </QueryClientProvider>
          </trpc.Provider>
        </ToastProvider>
      </UserProvider>
    </>
  )
}

export default MyApp
