import { container } from '../../container'
import CourseRepositoryJSON from '../../repositories/json/courseRepositoryJSON'
import ListCoursesController from './listCoursesController'
import ListCoursesService from './listCoursesService'

export const listCoursesFactory = () => {
  const { courseRepository } = container()
  const listCourses = new ListCoursesService(courseRepository)
  const listCoursesController = new ListCoursesController(listCourses)
  return listCoursesController
}
