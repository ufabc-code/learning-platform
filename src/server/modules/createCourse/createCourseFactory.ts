import { container } from '../../container'
import CourseRepositoryJSON from '../../repositories/json/courseRepositoryJSON'
import CreateCourseController from './createCourseController'
import CreateCourseService from './createCourseService'

export const createCourseFactory = () => {
  const { courseRepository } = container()
  const createCourseService = new CreateCourseService(courseRepository)
  const createCourseController = new CreateCourseController(createCourseService)
  return createCourseController
}
