import Container from 'components/container'
import { Accordion } from 'flowbite-react'
import { useRouter } from 'next/router'
import Course from 'server/entities/course'
import Module from 'server/entities/module'
import UserAnswerStatistic from 'server/entities/userAnswerStatistic'

interface CourseVisualizerProps {
  course: Course
  userAnswerStatistic: UserAnswerStatistic[]
}

export default function CourseVisualizer({
  course,
  userAnswerStatistic,
}: CourseVisualizerProps) {
  const router = useRouter()

  function isModuleCompleted(module: Module) {
    return module.lessons.every((l) =>
      userAnswerStatistic.map((u) => u.lessonId).includes(l.id),
    )
  }

  function isModuleCompletedIcon(module: Module): JSX.Element {
    if (isModuleCompleted(module))
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
    <Container>
      <div className="mt-10 justify-center my-auto flex text-4xl font-semibold dark:text-white">
        {course.title}
      </div>
      <div className="mt-3 mb-10 flex justify-center text-base font-normal dark:text-white">
        {course.description}
      </div>
      <div className="mb-3 flex text-2xl font-semibold leading-loose dark:text-white">
        Módulos
      </div>
      <Accordion alwaysOpen={true}>
        {course.modules.map((module) => (
          <Accordion.Panel key={module.id}>
            <Accordion.Title>
              <span className="flex items-center">
                {isModuleCompletedIcon(module)}
                <span className="ml-2">{module.title}</span>
              </span>
            </Accordion.Title>
            <Accordion.Content>
              <span className="flex justify-between text-base text-gray-900 dark:text-white">
                {module.description}
                <button
                  className="flex rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  type="button"
                  onClick={() =>
                    router.push(
                      `/student/courses/${course.id}/modules/${module.id}`,
                    )
                  }
                >
                  Ir para este módulo
                </button>
              </span>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </Container>
  )
}
