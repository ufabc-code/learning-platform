import MarkdownRender from 'components/markdownRender'
import StudentPageBase from 'components/student/pageBase'
import { courses } from 'server/router/courses/router'
import { trpc } from 'utils/trpc'

function Student() {
  const coursesQuery = trpc.useQuery(['courses.getAll'])

  console.log({ data: coursesQuery.data })

  return (
    <StudentPageBase title={'Cursos disponíveis'}>
      <div className="flex flex-col">
        <ul className="flex flex-col gap-y-2 text-gray-500 dark:text-gray-400">
          {coursesQuery.data?.map((course) => (
            <a href={`/student/courses/${course.id}`} key={course.id}>
              <span className="flex items-center">
                <svg
                  className="mr-1.5 h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <h1>{course.title}</h1>
              </span>
            </a>
          ))}
        </ul>
      </div>
    </StudentPageBase>
  )
}

export default Student
