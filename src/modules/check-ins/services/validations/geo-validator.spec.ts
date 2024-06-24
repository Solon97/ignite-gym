import { Coordinates } from '@/utils/get-distance-between-coordinates'
import { describe, expect, it } from 'vitest'
import { CheckinGeoValidator } from './geo-validator'
import { DistantGymCheckInError } from '@check-ins/errors/distant-gym-check-in'

describe('Check in Geo Validator', () => {
  it('should be no error when passing distances less than 100 meters', () => {
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

  it('should be throws error when passing distances greater than maximum distance', () => {
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
