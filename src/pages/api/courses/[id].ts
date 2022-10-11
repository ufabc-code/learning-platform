import { NextApiRequest, NextApiResponse } from 'next'
import { deleteCourseFactory } from '../../../server/modules/deleteCourse/deleteCourseFactory'
import { getCourseFactory } from '../../../server/modules/getCourse/getCourseFactory'
import { updateCourseFactory } from '../../../server/modules/updateCourse/updateCourseFactory'

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log(request.method)
  switch (request.method) {
    case 'DELETE':
      return deleteCourseFactory().handle(request, response)
    case 'GET':
      return getCourseFactory().handle(request, response)
    case 'PUT':
      return updateCourseFactory().handle(request, response)
  }
}
