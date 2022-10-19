import Lesson from './lesson'

class QuizLesson extends Lesson {
  id: string
  type: 'code' | 'quiz'
  public text: string
  public alternatives: Array<{
    text: string
  }> = []
  public solution: {
    text: string
    correct: []
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
