export class DistantGymCheckInError extends Error {
  constructor() {
    super('unable to check-in at distant gyms')
  }
}
