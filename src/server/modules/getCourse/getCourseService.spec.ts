import { container } from '../../container'
import Course from '../../entities/course'
import CreateCourseService from '../createCourse/createCourseService'
import GetCourseService from './getCourseService'

describe('Get Course Service', () => {
  it('Should be able to get a course', async () => {
    // create course
    const { courseRepository } = container()
    const createCourseService = new CreateCourseService(courseRepository)
    const course = await createCourseService.execute({
      title: 'New Course',
      description: 'New Course Description',
      slug: 'new-course',
      modules: []
    })

    // get course
    const getCourseService = new GetCourseService(courseRepository)
    const courseFound: Course | null = await getCourseService.execute(course.id)
    expect(courseFound).toHaveProperty('id')
    expect(courseFound?.id).toBe(course.id)
  })
})
