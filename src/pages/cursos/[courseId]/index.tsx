import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Course from 'server/entities/course'
import Module from 'server/entities/module'
import { client, trpc } from 'utils/trpc'

function Courses() {
  const router = useRouter()
  const { courseId } = router.query

  const courseQuery = trpc.useQuery(['courses.get', { id: courseId as string }])
  // const courseQuery2 = trpc.useQuery(['courses.getAll'])
  const courseUpdate = trpc.useMutation('courses.update')
  const deleteCourse = trpc.useMutation('courses.delete')
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    if (courseQuery.data) {
      setCourse(courseQuery.data)
    }
    // if(courseQuery2.data)
  }, [courseQuery.data])

  if (!course) return null

  function handleUpdateCourse() {
    if (!course) return

    courseUpdate.mutate(
      {
        id: course.id,
        course
      },
      {
        onSuccess: () => {
          client.invalidateQueries(['courses.get', { id: course.id }])
        }
      }
    )
  }

  function handleCreateModule() {
    if (!course) return

    const newModule: Module = {
      id: Math.random().toString(),
      title: '',
      description: '',
      lessons: []
    }

    courseUpdate.mutate(
      {
        id: course.id,
        course: {
          ...course,
          modules: [...course.modules, newModule]
        }
      },
      {
        onSuccess: () => {
          client.invalidateQueries(['courses.get', { id: course.id }])
        }
      }
    )
  }

  function handleDeleteCourse() {
    if (!course) return

    deleteCourse.mutate(
      {
        id: course.id
      },
      {
        onSuccess: () => {
          client.invalidateQueries(['courses.get', { id: course.id }])
          client.invalidateQueries('courses.list')
          router.push(`/`)
        }
      }
    )
  }

  return (
    <div>
      {JSON.stringify(course, null, 2)}
      <div>
        <button className="m-4 bg-red-500 p-4" onClick={handleUpdateCourse}>
          Salvar
        </button>

        <button className="m-4 bg-red-500 p-4" onClick={handleCreateModule}>
          Novo modulo
        </button>

        <button className="m-4 bg-red-500 p-4" onClick={handleDeleteCourse}>
          Deletar curso
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Titulo
          </label>
          <input
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            type="text"
            id="title"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Titulo"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Descrição
          </label>
          <input
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            type="text"
            id="description"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Descrição"
            required
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Slug
          </label>
          <input
            value={course.slug}
            onChange={(e) => setCourse({ ...course, slug: e.target.value })}
            type="text"
            id="slug"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Slug"
            required
          />
        </div>
      </div>

      <div>
        <h1>Modulos</h1>
        <div className="grid grid-cols-1 gap-4">
          {course.modules.map(({ id }) => (
            <Link href={`${courseId}/modules/${id}`} key={id}>
              {id}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Courses
