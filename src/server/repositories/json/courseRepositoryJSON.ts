import Course from '../../entities/course'
import ICourseRepository from '../iCourseRepository'
import fs from 'fs'
import path from 'path'

class CourseRepositoryJSON implements ICourseRepository {
  private filename = 'courses.json'

  async save(course: Course): Promise<void> {
    let courses = this.getCoursesFromFile()
    courses = courses.filter(({ id }) => id !== course.id)
    courses.push(course)
    this.saveCoursesToFile(courses)
  }

  async getAll(): Promise<Course[]> {
    return [...this.getCoursesFromFile()]
  }

  async delete(id: string): Promise<void> {
    let courses = this.getCoursesFromFile()
    courses = courses.filter(({ id: courseId }) => courseId !== id)
    this.saveCoursesToFile(courses)
  }

  async findById(id: string): Promise<Course | null> {
    const courses = this.getCoursesFromFile()
    const course = courses.find(({ id: courseId }) => courseId === id)
    return course || null
  }

  async clear(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  private getCoursesFromFile() {
    const courses: Course[] = JSON.parse(
      fs.readFileSync(
        path.join(
          'src',
          'server',
          'repositories',
          'json',
          'files',
          this.filename
        ),
        'utf8'
      )
    )
    return courses.map((course) => new Course({ ...course }))
  }

  private saveCoursesToFile(courses: Course[]) {
    fs.writeFileSync(
      path.join(
        'src',
        'server',
        'repositories',
        'json',
        'files',
        this.filename
      ),
      JSON.stringify(courses)
    )
  }
}

export default CourseRepositoryJSON
