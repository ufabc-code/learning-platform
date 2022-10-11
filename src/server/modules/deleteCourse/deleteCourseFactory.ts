import { container } from '../../container'
import DeleteCourseController from './deleteCourseController'
import DeleteCourseService from './deleteCourseService'

export const deleteCourseFactory = () => {
  const { courseRepository } = container()
  const deleteCourse = new DeleteCourseService(courseRepository)
  const deleteCourseController = new DeleteCourseController(deleteCourse)
  return deleteCourseController
}
