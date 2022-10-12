import Course from '../../entities/course'
import ICourseRepository from '../iCourseRepository'

class CourseRepositoryInMemory implements ICourseRepository {
  private courses: Course[] = []

  async save(course: Course): Promise<void> {
    this.courses = this.courses.filter(({ id }) => id !== course.id)
    this.courses.push(course)
  }

  async getAll(): Promise<Course[]> {
    return [...this.courses]
  }

  async delete(id: string): Promise<void> {
    this.courses = this.courses.filter(({ id: courseId }) => courseId !== id)
  }

  async findById(id: string): Promise<Course | null> {
    const course = this.courses.find(({ id: courseId }) => courseId === id)
    return course || null
  }

  async clear(): Promise<void> {
    this.courses = []
  }
}

export default CourseRepositoryInMemory
