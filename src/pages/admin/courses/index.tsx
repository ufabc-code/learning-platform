import AdminPageBase from 'components/adminPageBase'
import Switch from 'components/forms/switch'
import IconButton from 'components/iconButton'
import type { NextPage } from 'next'
import { QueryClient } from 'react-query'
import Course from 'server/entities/course'
import { trpc, client } from 'utils/trpc'

const Courses: NextPage = () => {
  const {
    data: courses,
    isError,
    isLoading
  } = trpc.useQuery(['courses.getAll'])
  const { mutate: createCourse } = trpc.useMutation('courses.create')
  const { mutate: deleteCourse } = trpc.useMutation('courses.delete')
  const { mutate: updateCourse } = trpc.useMutation('courses.update')

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

  const handleSwitchChange = (isChecked: boolean, id: string) => {
    // TODO send to api to activate/deactivate course
  }

  const handleDeleteCourse = (id: string) => {
    deleteCourse({ id }, { onSuccess: invalidateGetAll })
  }

  const handleEditCourse = ({ id, ...course }: Course) => {
    updateCourse({ course, id }, { onSuccess: invalidateGetAll })
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
            courses.map(({ id, title, ...rest }) => (
              <li key={id} className="flex border border-solid border-black">
                <h6 className="w-1/4 text-2xl">{title}</h6>
                <span className="w-1/4">Lorem ipsum</span>
                <span className="w-1/4">Lorem, ipsum</span>
                <div className="flex w-1/4 items-center">
                  <IconButton onClick={() => handleDeleteCourse(id)} />
                  <IconButton
                    onClick={() => handleEditCourse({ id, title, ...rest })}
                  />
                  <Switch onChangeChecked={handleSwitchChange} id={id} />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </AdminPageBase>
  )
}

export default Courses
