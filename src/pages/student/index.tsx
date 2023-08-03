import Course from 'server/entities/course'
import UserAnswerStatistic from 'server/entities/userAnswerStatistic'
import Spinner from 'components/spinner'
import Container from 'components/container'
import Link from 'next/link'
import ProgressBar from 'components/progressBar'
import { useEffect, useState } from 'react'
import { trpc } from 'utils/trpc'

function Student() {
  const [courses, setCourses] = useState<Course[] | undefined>([])
  const [userAnswerStatistics, setUserAnswerStatistics] = useState<
    UserAnswerStatistic[] | undefined
  >([])

  const [isLoadingCourses, setIsLoadingCourses] = useState(false)
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(false)
  const trpcClient = trpc.useContext().client
  const [loaded, setLoaded] = useState(false)

  function percentageBackgroundColor(course: Course): string {
    const conclusionPercentage = courseConclusionPercentage(
      course,
      userAnswerStatistics || [],
    )
    if (conclusionPercentage >= 1) return 'bg-green-500'
    if (conclusionPercentage > 0) return 'bg-blue-500'
    return 'bg-gray-500'
  }

  useEffect(() => {
    async function fetch() {
      if (!loaded) {
        setIsLoadingCourses(true)
        setCourses(await trpcClient.query('courses.getAll'))
        setIsLoadingCourses(false)

        try {
          setIsLoadingStatistics(true)
          setUserAnswerStatistics(await trpcClient.query('userStatistics.get'))
        } catch (e) {
        } finally {
          setIsLoadingStatistics(false)
        }
        setLoaded(true)
      }
    }
    fetch()
  }, [loaded, trpcClient, userAnswerStatistics])

  // const { data: courses, isLoading: isLoadingCourses } = trpc.useQuery(
  //   ['courses.getAll'],
  //   { useErrorBoundary: true },
  // )
  // const { data: userAnswerStatistics, isLoading: isLoadingStatistics } =
  //   trpc.useQuery(['userStatistics.get'], { useErrorBoundary: true })

  if (isLoadingCourses || isLoadingStatistics) {
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-y-1/2 -translate-x-1/2 flex-col items-center justify-center">
        <span className="mb-4 text-3xl text-flowbite-blue">Carregando...</span>
        <Spinner />
      </div>
    )
  }

  function courseConclusionPercentage(
    course: Course,
    userAnswerStatistics: UserAnswerStatistic[],
  ) {
    return (
      course.modules.filter((module) => {
        return module.lessons.every((l) =>
          userAnswerStatistics.map((u) => u.lessonId).includes(l.id),
        )
      }).length / course.modules.length
    )
  }

  if (!courses) {
    return (
      <div className="absolute top-1/2 left-1/2 flex -translate-y-1/2 -translate-x-1/2 flex-col items-center justify-center">
        <span className="text-xl text-red-600">
          Ocorreu um erro ao carregar as informações, tente novamente
        </span>
      </div>
    )
  }

  return (
    <Container>
      <h1 className="text-3xl font-bold my-5">Cursos</h1>
      <section className="w-full my-4">
        <ul className="grid grid-cols-4 gap-4">
          {courses.map((course) => (
            <li key={course.id}>
              <Link
                href={`/student/courses/${course.id}`}
                passHref
                legacyBehavior
              >
                <a>
                  <div className="flex flex-col rounded-lg border border-gray-100 bg-white shadow-md hover:bg-gray-100">
                    <div
                      className={
                        percentageBackgroundColor(course) + ' h-8 w-full'
                      }
                    ></div>
                    <div className="m-4">
                      <h5 className="mb-2 flex items-center text-2xl font-bold tracking-tight text-gray-900">
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
                                userAnswerStatistics || [],
                              ) * 100
                            }
                            className={percentageBackgroundColor(course)}
                          />
                        </div>
                      </div>
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
