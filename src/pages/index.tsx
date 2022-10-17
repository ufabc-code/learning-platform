import type { NextPage } from 'next'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { trpc } from '../utils/trpc'

const client = new QueryClient()

const AppContent = () => {
  const coursesQuery = trpc.useQuery(['courses.getAll'])
  const createCourse = trpc.useMutation('courses.create')
  console.log({ data: coursesQuery.data })

  function handleCreateCourse() {
    createCourse.mutate(
      {
        title: '',
        description: '',
        modules: [],
        slug: ''
      },
      {
        onSuccess: () => {
          client.invalidateQueries(['courses.getAll'])
        }
      }
    )
  }

  return (
    <div>
      <pre>{JSON.stringify(coursesQuery.data, null, 2)}</pre>
      <div>
        <button onClick={handleCreateCourse} className="bg-red-500 p-4">
          Create course
        </button>
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  const trpcClient = trpc.createClient({
    url: '/api/trpc'
  })

  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Home
