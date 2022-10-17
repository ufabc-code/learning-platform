import ICourseRepository from '../../repositories/iCourseRepository'

class DeleteCourseService {
  constructor(private coursesRepository: ICourseRepository) {}

  public async execute(id: string): Promise<void> {
    await this.coursesRepository.delete(id)
  }
}

export default DeleteCourseService
