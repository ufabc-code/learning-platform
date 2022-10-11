import { container } from '../../container'
import CreateCourseService from './createCourseService'

describe('Create Course Service', () => {
  it('Should be able to create a new course', async () => {
    const { courseRepository } = container()
    const createCourseService = new CreateCourseService(courseRepository)
    const course = await createCourseService.execute({
      title: 'New Course',
      description: 'New Course Description',
      slug: 'new-course',
      modules: []
    })

    expect((await courseRepository.getAll()).length).toBe(1)
    expect(course).toHaveProperty('id')
  })
})
