import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'

function Course() {
  const router = useRouter()
  const { courseId } = router.query

  const courseQuery = trpc.useQuery(['courses.get', { id: courseId as string }])
  const course = courseQuery.data

  if (!course) return null

  return (
    <div>
      <h1>modulos</h1>
      {course.modules.map((module) => (
        <a
          href={`/student/courses/${courseId}/modules/${module.id}`}
          key={course.id}
        >
          <h1>{module.id}</h1>
        </a>
      ))}
    </div>
  )
}

export default Course
