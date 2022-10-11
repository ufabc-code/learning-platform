import { container } from '../../container'
import UpdateCourseController from './updateCourseController'
import UpdateCourseService from './updateCourseService'

export const updateCourseFactory = () => {
  const { courseRepository } = container()
  const updateCourse = new UpdateCourseService(courseRepository)
  const updateCourseController = new UpdateCourseController(updateCourse)
  return updateCourseController
}
