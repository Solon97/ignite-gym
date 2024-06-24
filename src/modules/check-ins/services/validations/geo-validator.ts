import {
  Coordinates,
  getDistanceBetweenCoordinates,
} from '@/utils/get-distance-between-coordinates'
import { DistantGymCheckInError } from '@check-ins/errors/distant-gym-check-in'

export class CheckinGeoValidator {
  private static maximumDistanceInKms = 0.1

  get maximumDistanceInKms(): number {
    return this.maximumDistanceInKms
  }

  static execute(from: Coordinates, to: Coordinates) {
    const distance = getDistanceBetweenCoordinates(from, to)

    if (distance > CheckinGeoValidator.maximumDistanceInKms) {
      throw new DistantGymCheckInError()
    }
  }
}
