import ICourseRepository from './repositories/iCourseRepository'
import CourseRepositoryInMemory from './repositories/in-memory/courseRepositoryInMemory'
import CourseRepositoryJSON from './repositories/json/courseRepositoryJSON'

interface Container {
  courseRepository: ICourseRepository
}

const dev: Container = {
  courseRepository: new CourseRepositoryJSON()
}

const test: Container = {
  courseRepository: new CourseRepositoryInMemory()
}

export function container(): Container {
  const mode = process.env.MODE || 'dev'

  switch (mode) {
    case 'dev':
      return dev
    case 'test':
      return test
    default:
      throw new Error('Invalid mode')
  }
}
