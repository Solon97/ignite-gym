export class LateCheckInError extends Error {
  constructor() {
    super('the check-in can only be validated until 20 minutes of its creation')
  }
}
