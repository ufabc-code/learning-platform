import Course from 'server/entities/course'
import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'
import CourseVisualizer from 'components/student/courses/[courseId]/courseVisualizer'
import { useState, useEffect } from 'react'
import UserAnswerStatistic from 'server/entities/userAnswerStatistic'

function CoursePage() {
  const router = useRouter()
  const { courseId } = router.query
  const [course, setCourse] = useState<Course | undefined>(undefined)
  const [userAnswerStatistics, setUserAnswerStatistics] = useState<
    UserAnswerStatistic[]
  >([])
  const trpcClient = trpc.useContext().client
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function fetch() {
      if (!loaded && courseId) {
        const course = await trpcClient.query('courses.get', {
          id: courseId as string,
        })
        if (course) {
          setCourse(course)
        }

        try {
          const userAnswerStatistics = await trpcClient.query(
            'userStatistics.get',
          )
          if (userAnswerStatistics) {
            setUserAnswerStatistics(userAnswerStatistics)
          }
        } catch (e) {}
        setLoaded(true)
      }
    }
    fetch()
  }, [courseId, loaded, trpcClient])

  if (!course) return null

  return (
    <CourseVisualizer
      course={course}
      userAnswerStatistic={userAnswerStatistics}
    />
  )
}

export default CoursePage
