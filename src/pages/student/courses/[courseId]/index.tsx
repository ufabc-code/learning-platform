import MarkdownRender from 'components/markdownRender'
import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'

function Course() {
  const router = useRouter()
  const { courseId } = router.query

  const courseQuery = trpc.useQuery(['courses.get', { id: courseId as string }])
  const course = courseQuery.data

  if (!course) return null

  return (
    <>
      <MarkdownRender content="# Módulos" />
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        {course.modules.map((module) => (
          <a
            href={`/student/courses/${courseId}/modules/${module.id}`}
            key={course.id}
          >
            <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <MarkdownRender content={module.id} />
            </div>
            <div>
              <MarkdownRender content={module.description} />
            </div>
            <div>
              <MarkdownRender content={module.title} />
            </div>
          </a>
        ))}
      </div>
    </>
  )
}

export default Course
