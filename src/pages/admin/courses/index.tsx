import AdminPageBase from 'components/adminPageBase'
import Switch from 'components/forms/switch'
import IconButton from 'components/iconButton'
import type { NextPage } from 'next'
import { QueryClient } from 'react-query'
import { trpc, client } from 'utils/trpc'

const Courses: NextPage = () => {
  const courseQuery = trpc.useQuery(['courses.getAll'])
  const createCourse = trpc.useMutation('courses.create')
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

  const valueSwitch = (isChecked: boolean) => {
    console.log("COMPONENTE PAI ", isChecked)
  } 

  return (
    <AdminPageBase title="Gerenciar Cursos">
      <div className="flex flex-col">
        <button className="mb-6 flex h-10 w-10 justify-center self-end rounded-full border-2 border-solid border-black align-middle text-3xl font-bold leading-none">
          +
        </button>
        <ul className="flex flex-col gap-y-2">
          {[1,2,3,4,5].map((key) => (
            <li key={key} className="flex border border-solid border-black">
              <h6 className="flex-grow text-2xl">Lorem ipsum</h6>
              <span className="flex-grow">Lorem ipsum</span>
              <span className="flex-grow">Lorem, ipsum</span>
              <div className="flex-grow flex items-center">
                <IconButton onClick={() => {}}/>
                <IconButton onClick={() => {}}/>
                <Switch onChangeChecked={valueSwitch} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminPageBase>
  )
}

export default Courses
