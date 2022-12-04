import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'
import CourseVisualizer from 'components/student/courses/[courseId]/courseVisualizer'

function Course() {
  const router = useRouter()
  const { courseId } = router.query

  const { data: course } = trpc.useQuery(
    ['courses.get', { id: courseId as string }],
    { useErrorBoundary: true },
  )
  const { data: userAnswerStatistic } = trpc.useQuery(['userStatistics.get'], {
    useErrorBoundary: true,
  })
  const { data: l } = trpc.useQuery(
    ['lessonsToRemember.get', { courseId: courseId as string }],
    { useErrorBoundary: true },
  )
  if (!course || !userAnswerStatistic || !l) return null

  return (
    <CourseVisualizer
      course={course}
      userAnswerStatistic={userAnswerStatistic}
    />
  )
}

export default Course
