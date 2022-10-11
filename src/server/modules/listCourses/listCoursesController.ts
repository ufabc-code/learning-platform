import { NextApiRequest, NextApiResponse } from 'next'
import ListCoursesService from './listCoursesService'

class ListCoursesController {
  constructor(private listCourses: ListCoursesService) {}

  async handle(request: NextApiRequest, response: NextApiResponse) {
    const courses = await this.listCourses.execute()
    return response.json(courses)
  }
}

export default ListCoursesController
