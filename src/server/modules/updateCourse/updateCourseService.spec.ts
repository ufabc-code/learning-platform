import { container } from '../../container'
import CreateCourseService from '../createCourse/createCourseService'
import UpdateCourseService from './updateCourseService'

describe('Update Course Service', () => {
  it('Should be able to update a course', async () => {
    const { courseRepository } = container()

    // create course
    const createCourseService = new CreateCourseService(courseRepository)
    const course = await createCourseService.execute({
      title: 'New Course',
      description: 'New Course Description',
      slug: 'new-course',
      modules: []
    })

    // update course
    const updateCourseService = new UpdateCourseService(courseRepository)
    const courseUpdated = await updateCourseService.execute({
      id: course.id,
      title: 'New Course Updated',
      description: 'New Course Description Updated',
      slug: 'new-course-updated',
      modules: []
    })

    expect(courseUpdated.title).toBe('New Course Updated')
    expect(courseUpdated.description).toBe('New Course Description Updated')
    expect(courseUpdated.slug).toBe('new-course-updated')
  })
})
