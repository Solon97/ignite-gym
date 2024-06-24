export class SameDayCheckInError extends Error {
  constructor() {
    super('It is not possible to do more than one check-in on the same day')
  }
}
