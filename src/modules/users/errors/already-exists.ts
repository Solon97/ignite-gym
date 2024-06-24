export class UserAlreadyExistsError extends Error {
  constructor() {
    super('email already exists')
  }
}
