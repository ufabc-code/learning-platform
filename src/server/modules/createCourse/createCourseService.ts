import { v4 as uuid } from 'uuid'
import Course from '../../entities/course'
import Module from '../../entities/module'
import ICourseRepository from '../../repositories/iCourseRepository'

type DTO = {
  title: string
  description: string
  modules: Module[]
  slug: string
}

class CreateCourseService {
  constructor(private courseRepository: ICourseRepository) {}

  async execute({ title, description, modules, slug }: DTO) {
    const id = uuid()
    const course = new Course({ id, title, description, modules, slug })
    await this.courseRepository.save(course)
    return course
  }
}

export default CreateCourseService
