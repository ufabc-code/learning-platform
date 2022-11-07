import { container } from 'server/container'
import EvaluateLessonService from './evaluateLessonService'

export const evaluateLessonFactory = () => {
  const { courseRepository } = container()
  return new EvaluateLessonService(courseRepository)
}
