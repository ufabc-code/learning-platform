import Module from './module'

class Course {
  public id: string
  public title: string
  public description: string
  public modules: Module[]
  public slug: string

  constructor({ id, title, description, modules, slug }: Course) {
    this.id = id
    this.title = title
    this.description = description
    this.modules = modules
    this.slug = slug
  }
}

export default Course
