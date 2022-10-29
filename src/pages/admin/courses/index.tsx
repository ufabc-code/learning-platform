import AdminPageBase from 'components/adminPageBase'
import type { NextPage } from 'next'
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
        slug: ''
      },
      {
        onSuccess: invalidateGetAll
      }
    )
  }

  return (
    <AdminPageBase title="Gerenciar Cursos">
      <div className="flex flex-col">
        <button
          onClick={handleCreateCourse}
          className="mb-6 flex h-10 w-10 justify-center self-end rounded-full border-2 border-solid border-black align-middle text-3xl font-bold leading-none"
        >
          +
        </button>
        <ul className="flex flex-col gap-y-2">
          {!!courses &&
            courses.map(({ id, title }) => (
              <li key={id} className="flex border border-solid border-black">
                <h6 className="w-1/3 text-2xl">{title}</h6>
                <span className="w-1/3">Lorem ipsum</span>
                <span className="w-1/3">Lorem, ipsum</span>
              </li>
            ))}
        </ul>
      </div>
    </AdminPageBase>
  )
}

export default Courses
