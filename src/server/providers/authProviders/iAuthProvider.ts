interface IAuthProvider {
  check(data: { email: string; token: string }): Promise<boolean>
}

export default IAuthProvider
