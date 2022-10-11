import { container } from '../../container'
import GetCourseController from './getCourseController'
import GetCourseService from './getCourseService'

export const getCourseFactory = () => {
  const { courseRepository } = container()
  const getCourseService = new GetCourseService(courseRepository)
  return new GetCourseController(getCourseService)
}
