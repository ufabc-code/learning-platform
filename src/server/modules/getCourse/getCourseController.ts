import { NextApiRequest, NextApiResponse } from 'next'
import GetCourseService from './getCourseService'

class GetCourseController {
  constructor(private getCourse: GetCourseService) {}

  async handle(request: NextApiRequest, response: NextApiResponse) {
    const { id } = request.query
    const course = await this.getCourse.execute(id as string)
    return response.json(course)
  }
}

export default GetCourseController
