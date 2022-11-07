import Course from 'server/entities/course'
import Module from 'server/entities/module'

export function createCourse({
  lessons = []
}: {
  lessons?: Module['lessons']
}) {
  const courseModule: Module = {
    id: 'course-1-module-1',
    title: 'new title course-1-module-1',
    description: 'new description course-1-module-1',
    lessons
  }

  const course: Course = {
    id: 'course-1',
    title: 'new title course-1',
    description: 'new description course-1',
    modules: [courseModule],
    slug: 'new slug course-1'
  }

  return course
}
