import { updateCourseFactory } from './../../modules/updateCourse/updateCourseFactory'
import { getCourseFactory } from './../../modules/getCourse/getCourseFactory'
import { listCoursesFactory } from './../../modules/listCourses/listCoursesFactory'
import { CourseSchema } from './schemas/courseSchema'
import { createCourseFactory } from './../../modules/createCourse/createCourseFactory'
import { createRouter } from '../context'
import { z } from 'zod'
import { deleteCourseFactory } from '../../modules/deleteCourse/deleteCourseFactory'

export const courses = createRouter()
  .mutation('create', {
    input: CourseSchema,
    resolve: async ({ input }) => {
      const { title, description, modules, slug } = input
      return await createCourseFactory().execute({
        title,
        description,
        modules,
        slug
      })
    }
  })
  .mutation('delete', {
    input: z.object({
      id: z.string()
    }),
    resolve: async ({ input }) => {
      const { id } = input
      await deleteCourseFactory().execute(id)
    }
  })
  .mutation('update', {
    input: z.object({
      id: z.string(),
      course: CourseSchema
    }),
    resolve: async ({ input }) => {
      const { id, course } = input
      const { title, description, modules, slug } = course
      return await updateCourseFactory().execute({
        id,
        title,
        description,
        modules,
        slug
      })
    }
  })
  .query('getAll', {
    resolve: async () => {
      return await listCoursesFactory().execute()
    }
  })
  .query('get', {
    input: z.object({
      id: z.string()
    }),
    resolve: async ({ input }) => {
      const { id } = input
      return await getCourseFactory().execute(id)
    }
  })
