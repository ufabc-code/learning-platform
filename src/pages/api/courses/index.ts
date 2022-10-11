import { NextApiRequest, NextApiResponse } from 'next'
import { createCourseFactory } from '../../../server/modules/createCourse/createCourseFactory'
import { listCoursesFactory } from '../../../server/modules/listCourses/listCoursesFactory'

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  switch (request.method) {
    case 'POST':
      return createCourseFactory().handle(request, response)
    case 'GET':
      return listCoursesFactory().handle(request, response)
    default:
      response.json({ message: 'Method not allowed' })
  }
}
