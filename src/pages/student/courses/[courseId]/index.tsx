import MarkdownRender from 'components/markdownRender'
import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'
import User from 'server/entities/user'
import UserAnswerStatistic from 'server/entities/userAnswerStatistic'

function Course(user?: User, userAnswerStatistic?: UserAnswerStatistic[]) {
  const router = useRouter()
  const { courseId } = router.query

  const courseQuery = trpc.useQuery(['courses.get', { id: courseId as string }])
  const course = courseQuery.data

  if (!course) return null

  const isModuleCompleteIcon = true

  function isModuleCompleted() {
    if (userAnswerStatistic == undefined) return false
    //verificar se o modulo está entre os que o usuario ja respondeu
    const userAnswerStatisticFiltered = userAnswerStatistic.filter(
      (el) => el.moduleId == module.id && el.attempts > 0,
    )

    return userAnswerStatisticFiltered.length > 0
  }

  function isModuleCompletedIcon(): JSX.Element {
    if (user == undefined || course == undefined)
      return (
        <svg
          className="mr-2 h-5 w-5 shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      )

    if (isModuleCompleted())
      return (
        <svg
          className="h-6 w-6"
          fill="white"
          stroke="green"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      )

    return (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    )
  }

  return (
    <div className="p-8">
      <MarkdownRender content="# Módulos" />
      <div className="py-5">
        <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          {course.modules.map((module) => (
            <>
              <div className="flex">
                <h5>
                  <MarkdownRender content={module.title} />
                </h5>
                <>{isModuleCompleteIcon}</>
              </div>
              <p>
                <MarkdownRender content={module.description} />
              </p>
              <div className="flex justify-between py-2">
                <div className="w-1/6 text-center">
                  <p>{module.lessons.length}</p>
                  <p>Lições</p>
                </div>
                <div className="w-1/6 py-1">
                  <a
                    href={`/student/courses/${courseId}/modules/${module.id}`}
                    key={course.id}
                    className="flex rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Course
