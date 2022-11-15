import AdminPageBase from 'components/admin/pageBase'
import useLessonStatistics from 'hooks/useLessonStatistics'
import type { NextPage } from 'next'
import Link from 'next/link'
import { QuizUserAnswer } from 'server/entities/quizUserAnswer'
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

  const { lesson, handleEvaluateAnswer, handleSaveAnswers } =
    useLessonStatistics({
      courseId: 'f8a7014b-1d59-41ac-b8bd-600afb89c982',
      moduleId: '0.6705410453243992',
    })

  return (
    <AdminPageBase title="Gerenciar Cursos">
      <div>
        <button
          onClick={() =>
            handleEvaluateAnswer(new QuizUserAnswer({ alternatives: [0] }))
          }
        >
          Evaluate Answer
        </button>
        <button onClick={() => handleSaveAnswers()}>Save Answers</button>
      </div>
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
              <Link href={`courses/${id}`} key={id}>
                <a>
                  <li className="flex border border-solid border-black">
                    <h6 className="w-1/3 text-2xl">{title}</h6>
                    <span className="w-1/3">Lorem ipsum</span>
                    <span className="w-1/3">Lorem, ipsum</span>
                  </li>
                </a>
              </Link>
            ))}
        </ul>
      </div>
    </AdminPageBase>
  )
}

export default Courses
