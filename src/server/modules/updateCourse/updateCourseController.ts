import { NextApiRequest, NextApiResponse } from 'next'
import UpdateCourseService from './updateCourseService'

class UpdateCourseController {
  constructor(private updateCourse: UpdateCourseService) {}

  async handle(request: NextApiRequest, response: NextApiResponse) {
    const { id } = request.query
    const { title, description, slug, modules } = request.body
    const course = await this.updateCourse.execute({
      id: id as string,
      title,
      description,
      slug,
      modules
    })
    return response.json(course)
  }
}

export default UpdateCourseController
