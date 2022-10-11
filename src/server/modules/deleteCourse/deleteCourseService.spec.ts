import { container } from '../../container'
import CreateCourseService from '../createCourse/createCourseService'
import DeleteCourseService from './deleteCourseService'

describe('Delete Course Service', () => {
  it('Should be able to delete a course', async () => {
    const { courseRepository } = container()

    // create course
    const createCourseService = new CreateCourseService(courseRepository)
    const course = await createCourseService.execute({
      title: 'New Course',
      description: 'New Course Description',
      slug: 'new-course',
      modules: []
    })

    // delete course
    const deleteCourseService = new DeleteCourseService(courseRepository)
    await deleteCourseService.execute(course.id)

    expect((await courseRepository.getAll()).length).toBe(0)
  })
})
