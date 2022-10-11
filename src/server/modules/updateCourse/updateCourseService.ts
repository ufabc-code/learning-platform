import Module from '../../entities/module'
import ICourseRepository from '../../repositories/iCourseRepository'

type DTO = {
  id: string
  title: string
  description: string
  modules: Module[]
  slug: string
}

class UpdateCourseService {
  constructor(private courseRepository: ICourseRepository) {}

  async execute({ id, title, description, slug, modules }: DTO) {
    const course = await this.courseRepository.findById(id)

    if (!course) {
      throw new Error('Course not found')
    }

    course.title = title
    course.description = description
    course.slug = slug
    course.modules = modules

    await this.courseRepository.save(course)
    return course
  }
}

export default UpdateCourseService
