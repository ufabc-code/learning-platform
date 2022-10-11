import { NextApiRequest, NextApiResponse } from 'next'
import DeleteCourseService from './deleteCourseService'

class DeleteCourseController {
  constructor(private deleteCourse: DeleteCourseService) {}

  async handle(request: NextApiRequest, response: NextApiResponse) {
    const { id } = request.query
    await this.deleteCourse.execute(id as string)
    return response.status(204).end()
  }
}

export default DeleteCourseController
