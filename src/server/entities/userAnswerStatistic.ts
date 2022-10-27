class UserAnswerStatistic {
  readonly userId: string
  readonly courseId: string
  readonly moduleId: string
  readonly lessonId: string
  readonly attempts: number
  readonly updatedAt: Date

  constructor({
    userId,
    courseId,
    moduleId,
    lessonId,
    attempts,
    updatedAt
  }: UserAnswerStatistic) {
    this.userId = userId
    this.courseId = courseId
    this.moduleId = moduleId
    this.lessonId = lessonId
    this.attempts = attempts
    this.updatedAt = updatedAt
  }
}

export default UserAnswerStatistic
