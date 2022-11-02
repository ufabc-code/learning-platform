import { container } from 'server/container'
import EvaluateLessonService from '../evaluateLesson/evaluateLessonService'
import EvaluateModuleService from './evaluateModuleService'

export const evaluateModuleFactory = () => {
  const { courseRepository, userAnswerStatisticRepository } = container()
  const evaluateLesson = new EvaluateLessonService(courseRepository)
  return new EvaluateModuleService(
    evaluateLesson,
    userAnswerStatisticRepository
  )
}
