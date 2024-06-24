export class MaxNumberCheckInsError extends Error {
  constructor() {
    super('Max numberof check-ins reached.')
  }
}
