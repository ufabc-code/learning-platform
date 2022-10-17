import { container } from '../../container'
import CreateCourseService from '../createCourse/createCourseService'
import ListCoursesService from './listCoursesService'

describe('List Courses Service', () => {
  it('Should be able to list all courses', async () => {
    const { courseRepository } = container()

    // create course
    const createCourseService = new CreateCourseService(courseRepository)
    await createCourseService.execute({
      title: 'New Course',
      description: 'New Course Description',
      slug: 'new-course',
      modules: []
    })

    // list courses
    const listCoursesService = new ListCoursesService(courseRepository)
    const courses = await listCoursesService.execute()

    expect(courses.length).toBe(1)
  })
})
