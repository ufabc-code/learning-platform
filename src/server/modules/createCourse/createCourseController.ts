import { NextApiRequest, NextApiResponse } from 'next'
import CreateCourseService from './createCourseService'

class CreateCourseController {
  constructor(private createCourse: CreateCourseService) {}

  async handle(request: NextApiRequest, response: NextApiResponse) {
    const { title, description, modules, slug } = request.body
    const course = await this.createCourse.execute({
      title,
      description,
      modules,
      slug
    })
    return response.json(course)
  }
}

export default CreateCourseController
