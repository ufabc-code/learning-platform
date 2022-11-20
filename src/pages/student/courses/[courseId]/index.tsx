import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'
import { Accordion } from "flowbite-react";
import CourseVisualizer from 'components/student/courses/[courseId]/courseVisualizer';

function Course() {
  const router = useRouter()
  const { courseId } = router.query

  const courseQuery = trpc.useQuery(['courses.get', { id: courseId as string }])
  const course = courseQuery.data

  if (!course) return null

  return (
    <CourseVisualizer course={course} />
  )
}

export default Course
