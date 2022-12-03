import { trpc } from 'utils/trpc'
import Course from 'server/entities/course'
import UserAnswerStatistic from 'server/entities/userAnswerStatistic'
import Spinner from 'components/spinner'
import Container from 'components/container'
import Link from 'next/link'
import ProgressBar from 'components/progressBar'

function Student() {
  const { data: courses, isLoading: isLoadingCourses } = trpc.useQuery([
    'courses.getAll',
  ])
  const { data: userAnswerStatistic, isLoading: isLoadingStatistics } =
    trpc.useQuery(['userStatistics.get'])

  if (isLoadingCourses || isLoadingStatistics) {
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-y-1/2 -translate-x-1/2 flex-col items-center justify-center">
        <span className="mb-4 text-3xl text-flowbite-blue">Carregando...</span>
        <Spinner />
      </div>
    )
  }

  if (!courses || !userAnswerStatistic)
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-y-1/2 -translate-x-1/2 flex-col items-center justify-center">
        <span className="text-xl text-red-600">
          Ocorreu um erro ao carregar as informações, tente novamente
        </span>
      </div>
    )

  function courseConclusionPercentage(
    course: Course,
    userAnswerStatistic: UserAnswerStatistic[],
  ) {
    return (
      course.modules.filter((module) => {
        return module.lessons.every((l) =>
          userAnswerStatistic.map((u) => u.lessonId).includes(l.id),
        )
      }).length / course.modules.length
    )
  }
  return (
    <Container>
      <section className="w-4/5">
        <h1 className="mt-6 mb-10 text-2xl font-bold leading-none">Cursos</h1>
        <ul className="grid grid-cols-2 gap-4 text-gray-500">
          {courses.map((course) => (
            <li key={course.id}>
              <Link
                href={`/student/courses/${course.id}`}
                passHref
                legacyBehavior
              >
                <a className="flex h-full w-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100">
                  <h5 className="mb-2 flex items-center text-2xl font-bold tracking-tight text-gray-900">
                    <svg
                      className={`mr-2 h-6 w-6 ${
                        courseConclusionPercentage(
                          course,
                          userAnswerStatistic,
                        ) === 1
                          ? 'text-green-500'
                          : ''
                      }`}
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
                    {course.title}
                  </h5>
                  <div className="mt-auto">
                    <p className="font-normal text-gray-700">
                      {course.description}
                    </p>
                    <div className="mt-4">
                      <ProgressBar
                        progress={
                          courseConclusionPercentage(
                            course,
                            userAnswerStatistic,
                          ) * 100
                        }
                        color={
                          courseConclusionPercentage(
                            course,
                            userAnswerStatistic,
                          ) === 1
                            ? 'green-500'
                            : 'blue-500'
                        }
                      />
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}

export default Student
