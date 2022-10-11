import ICourseRepository from './repositories/iCourseRepository'
import CourseRepositoryJSON from './repositories/json/courseRepositoryJSON'

interface Container {
  courseRepository: ICourseRepository
}

const dev: Container = {
  courseRepository: new CourseRepositoryJSON()
}

export function container(): Container {
  return dev
}
