import Lesson from './lesson'

class QuizLesson extends Lesson {
  public id: string
  public type: 'code' | 'quiz'
  public text: string
  public alternatives: Array<{
    text: string
  }> = []
  public solution: {
    text: string
    correct: number[]
  }

  constructor({ id, text, alternatives, solution }: QuizLesson) {
    super()
    this.id = id
    this.type = 'quiz'
    this.text = text
    this.alternatives = alternatives
    this.solution = solution
  }
}

export default QuizLesson
