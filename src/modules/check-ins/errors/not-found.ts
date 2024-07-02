export class CheckInNotFoundError extends Error {
  constructor() {
    super('check-in not found')
  }
}
