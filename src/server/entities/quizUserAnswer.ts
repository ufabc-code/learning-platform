import { UserAnswer, UserAnswerEvaluation } from './lessonUserAnswer'
import QuizLesson from './quizLesson'

export class QuizUserAnswer implements UserAnswer {
  public alternatives: number[]

  constructor({ alternatives }: { alternatives: number[] }) {
    this.alternatives = alternatives
  }

  async evaluate({ solution }: QuizLesson): Promise<UserAnswerEvaluation> {
    return {
      correct:
        this.alternatives.every((alternative) =>
          solution.correct.includes(alternative),
        ) &&
        solution.correct.every((correct) =>
          this.alternatives.includes(correct),
        ),
    }
  }
}
