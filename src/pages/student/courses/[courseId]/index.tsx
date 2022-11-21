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
  const course = courseQuery.data
  if (!course) return null

  //TODO: buscar usuario logado e suas estatisticas
  //variaveis para testes enquanto não foi implementado o usuario logado
  const user = { id: "e0c9c733-86e6-47e9-9051-82f3099aee0c", email: "" }
  const userAnswerStatistic = [{ "userId": "e0c9c733-86e6-47e9-9051-82f3099aee0c", "courseId": "f8a7014b-1d59-41ac-b8bd-600afb89c982", "moduleId": "0.6705410453243992", "lessonId": "0.15750786643702486", "attempts": 2, "updatedAt": new Date() }, { "userId": "e0c9c733-86e6-47e9-9051-82f3099aee0c", "courseId": "f8a7014b-1d59-41ac-b8bd-600afb89c982", "moduleId": "0.6705410453243992", "lessonId": "0.172244008144258", "attempts": 1, "updatedAt": new Date() }]



  return (
    <CourseVisualizer course={course} user={user} userAnswerStatistic={userAnswerStatistic}/>
  )
}

export default Course
