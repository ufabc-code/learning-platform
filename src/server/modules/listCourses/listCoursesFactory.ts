import { container } from '../../container'
import ListCoursesService from './listCoursesService'

export const listCoursesFactory = () => {
  const { courseRepository } = container()
  return new ListCoursesService(courseRepository)
}
