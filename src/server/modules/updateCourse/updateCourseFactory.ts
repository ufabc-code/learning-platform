import { container } from '../../container'
import UpdateCourseController from './updateCourseController'
import UpdateCourseService from './updateCourseService'

export const updateCourseFactory = () => {
  const { courseRepository } = container()
  return new UpdateCourseService(courseRepository)
}
