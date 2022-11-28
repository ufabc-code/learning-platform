import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'
import CourseVisualizer from 'components/student/courses/[courseId]/courseVisualizer';
import IUserAnswerStatisticRepository from 'server/repositories/iUserAnswerStatisticRepository';
import Module from 'server/entities/module';
import UserAnswerStatistic from 'server/entities/userAnswerStatistic';
import User from 'server/entities/user';


function Course() {
  const router = useRouter()
  const { courseId } = router.query

  const courseQuery = trpc.useQuery(['courses.get', { id: courseId as string }])
  const userStatisticQuery = trpc.useQuery(['userStatistics.get'])
  const L = trpc.useQuery([ 'lessonsToRemember.get', { courseId: courseId as string }])
  const l = L.data
  const course = courseQuery.data
  const userAnswerStatistic = userStatisticQuery.data
  if (!course || !userAnswerStatistic || !l)  return null

  return (
    <CourseVisualizer course={course} userAnswerStatistic={userAnswerStatistic}/>
  )
}

export default Course
