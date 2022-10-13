import { container } from '../../container'
import GetCourseService from './getCourseService'

export const getCourseFactory = () => {
  const { courseRepository } = container()
  return new GetCourseService(courseRepository)
}
