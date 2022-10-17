import ICourseRepository from '../../repositories/iCourseRepository'

class GetCourseService {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(id: string) {
    const course = await this.courseRepository.findById(id)
    return course
  }
}

export default GetCourseService
