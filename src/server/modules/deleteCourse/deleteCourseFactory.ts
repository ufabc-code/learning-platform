import { container } from '../../container'
import DeleteCourseService from './deleteCourseService'

export const deleteCourseFactory = () => {
  const { courseRepository } = container()
  return new DeleteCourseService(courseRepository)
}
