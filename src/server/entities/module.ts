import Lesson from './lesson'

class Module {
  public id: string
  public title: string
  public description: string
  public lessons: Lesson[]

  constructor({ id, title, description, lessons }: Module) {
    this.id = id
    this.title = title
    this.description = description
    this.lessons = lessons
  }
}

export default Module
