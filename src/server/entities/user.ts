class User {
  public id: string
  public email: string

  constructor({ id, email }: User) {
    this.id = id
    this.email = email
  }
}

export default User
