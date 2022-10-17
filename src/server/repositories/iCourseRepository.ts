import Course from '../entities/course'

interface ICourseRepository {
  save(course: Course): Promise<void>
  getAll(): Promise<Course[]>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Course | null>
}

export default ICourseRepository
