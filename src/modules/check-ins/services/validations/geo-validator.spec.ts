import { Coordinates } from '@/utils/get-distance-between-coordinates'
import { describe, expect, it } from 'vitest'
import { CheckinGeoValidator } from './geo-validator'
import { DistantGymCheckInError } from '@check-ins/errors/distant-gym-check-in'

describe('Check in Geo Validator', () => {
  it('should be able to check in to a gym with a distance less than the maximum', () => {
    const coordinates: Coordinates[] = [
      {
        latitude: -7.9891696,
        longitude: -34.8477379,
      },
      {
        latitude: -7.9884092,
        longitude: -34.8477379,
      },
    ]

    CheckinGeoValidator.execute(coordinates[0], coordinates[1])
  })

  it('should not be able to check in to a gym that is greater than the maximum distance', () => {
    const coordinates: Coordinates[] = [
      {
        latitude: -7.9599677,
        longitude: -34.8412848,
      },
      {
        latitude: -7.6871862,
        longitude: -34.8351681,
      },
    ]

    expect(() =>
      CheckinGeoValidator.execute(coordinates[0], coordinates[1]),
    ).toThrow(DistantGymCheckInError)
  })
})
