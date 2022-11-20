import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'
import { Accordion } from "flowbite-react";

function Course() {
  const router = useRouter()
  const { courseId } = router.query

  const courseQuery = trpc.useQuery(['courses.get', { id: courseId as string }])
  const course = courseQuery.data

  if (!course) return null

  return (
    <div className='p-8'>
      <div className='my-auto flex text-3xl font-semibold dark:text-white'>{course.title}</div>
      <div className='my-auto flex text-base font-normal dark:text-white'>{course.description}</div>
      <div className='my-auto flex text-2xl font-semibold leading-loose dark:text-white'>Módulos</div>
      <Accordion alwaysOpen={true}>
        {course.modules.map((module) => (
          <Accordion.Panel isOpen={false}>
            <Accordion.Title>
              <span className='flex items-center'>
                <svg className="w-5 h-5 mr-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>{module.title}
              </span>
            </Accordion.Title>
            <Accordion.Content>
              <span className='flex text-base text-gray-900 dark:text-white justify-between'>
                {module.description}
                <button
                  className="flex rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  type="button"
                  onClick={() => router.push(`/student/courses/${courseId}/modules/${module.id}`)}>
                  Ir para este módulo
                  <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </span>
            </Accordion.Content>
          </Accordion.Panel>
        ))}
      </Accordion>
    </div>
  )
}

export default Course
