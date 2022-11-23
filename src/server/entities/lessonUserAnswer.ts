import Lesson from './lesson'

export interface UserAnswerEvaluation {
  correct: boolean
  message?: string
}

export interface UserAnswer {
  evaluate(lesson: Lesson): Promise<UserAnswerEvaluation>
}

export interface LessonUserAnswer {
  courseId: string
  moduleId: string
  lessonId: string
  answer: UserAnswer
}
