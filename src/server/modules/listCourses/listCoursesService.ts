import ICourseRepository from '../../repositories/iCourseRepository'

class ListCoursesService {
  constructor(private courseRepository: ICourseRepository) {}

  async execute() {
    return await this.courseRepository.getAll()
  }
}

export default ListCoursesService
