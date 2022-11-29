import { PlusCircleIcon } from '@heroicons/react/24/outline'
import AdminPageBase from 'components/admin/pageBase'
import type { NextPage } from 'next'
import Link from 'next/link'
import { trpc, client } from 'utils/trpc'

const Courses: NextPage = () => {
  const { data: courses } = trpc.useQuery(['courses.getAll'])
  const { mutate: createCourse } = trpc.useMutation('courses.create')

  const invalidateGetAll = () => client.invalidateQueries(['courses.getAll'])

  const handleCreateCourse = () => {
    createCourse(
      {
        title: 'title-' + courses?.length,
        description: '',
        modules: [],
        slug: '',
      },
      {
        onSuccess: invalidateGetAll,
      },
    )
  }

  return (
    <AdminPageBase title="Gerenciar Cursos">
      <div className="flex flex-col">
        <div className="mb-4 flex justify-end">
          <button
            className="rounded-full p-1 text-blue-600 hover:bg-blue-100"
            onClick={handleCreateCourse}
          >
            <PlusCircleIcon className="h-12 w-12" />
          </button>
        </div>
        <ul className="flex flex-col gap-y-2">
          {!!courses &&
            courses.map(({ id, title }) => (
              <Link href={`courses/${id}`} key={id}>
                <div className="cursor-pointer rounded-xl border p-4 shadow-md hover:bg-gray-100">
                  <h4 className="text-lg font-medium">{title}</h4>
                </div>
              </Link>
            ))}
        </ul>
      </div>
    </AdminPageBase>
  )
}

export default Courses
