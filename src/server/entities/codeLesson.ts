import Lesson from './lesson'

class CodeLesson extends Lesson {
  public id: string
  public type: 'code' | 'quiz'
  public solution = { text: '', code: '', language: '' }
  public template = { code: '', language: '' }
  public tests: Array<{
    input: string
    expected: string
  }> = []
  public text = ''

  constructor({ id, solution, template, tests, text }: CodeLesson) {
    super()
    this.id = id
    this.type = 'code'
    this.solution = solution
    this.template = template
    this.tests = tests
    this.text = text
  }
}

export default CodeLesson
