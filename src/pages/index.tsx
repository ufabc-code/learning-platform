import type { NextPage } from 'next'
import Link from 'next/link'
import { QueryClient } from 'react-query'
import { trpc, client } from 'utils/trpc'



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
      { 
      coursesQuery.data?.map(course => (
        <a href={`/cursos/${course.id}`}>
          { JSON.stringify(course.id, null, 2)}
        </a>
      ))
       
      }
    </div>
  )
}

const Home: NextPage = () => {
  return <AppContent />
}

export default Home
