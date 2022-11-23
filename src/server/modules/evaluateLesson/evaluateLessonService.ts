import { LessonUserAnswer } from 'server/entities/lessonUserAnswer'
import ICourseRepository from 'server/repositories/iCourseRepository'

class EvaluateLessonService {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(lessonUserAnswer: LessonUserAnswer) {
    const { courseId, moduleId, lessonId, answer } = lessonUserAnswer
    const lesson = await this.getLesson({ courseId, moduleId, lessonId })
    return await answer.evaluate(lesson)
  }

  private async getLesson({
    courseId,
    moduleId,
    lessonId
  }: {
    courseId: string
    moduleId: string
    lessonId: string
  }) {
    const course = await this.courseRepository.findById(courseId)

    if (!course) {
      throw new Error('Course not found')
    }

    const courseModule = course.modules.find(({ id }) => id === moduleId)

    if (!courseModule) {
      throw new Error('Module not found')
    }

    const lesson = courseModule.lessons.find((lesson) => lesson.id === lessonId)

    if (!lesson) {
      throw new Error('Lesson not found')
    }

    return lesson
  }
}

export default EvaluateLessonService
