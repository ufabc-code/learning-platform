import { container } from '../../container'
import CreateCourseService from './createCourseService'

export const createCourseFactory = (): CreateCourseService => {
  const { courseRepository } = container()
  return new CreateCourseService(courseRepository)
}
