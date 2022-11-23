import { trpc } from 'utils/trpc'
import StudentPageBase from 'components/student/pageBase'

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
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
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
