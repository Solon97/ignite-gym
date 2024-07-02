import { getFakeGyms } from '@/test/mocks/fake-entities'
import { Gym, GymRepository } from '@gyms/repositories/interface'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GetNearbyGymsService } from './get-nearby-gyms'

const defaultGymsLength = 3
let sut: GetNearbyGymsService

describe('Search Gyms Service', () => {
  beforeEach(() => {
    sut = NewGetNearbyGymsService(defaultGymsLength)
  })

  it('should be able to get nearby gyms', async () => {
    const gyms = await sut.execute({
      userLatitude: 0,
      userLongitude: 0,
      page: 1,
    })

    expect(gyms.gyms).toHaveLength(3)
    expect(gyms.gyms).toEqual([
      expect.objectContaining({
        id: 'gym-1',
      }),
      expect.objectContaining({
        id: 'gym-2',
      }),
      expect.objectContaining({
        id: 'gym-3',
      }),
    ])
  })
})

function NewGetNearbyGymsService(gymsLength: number): GetNearbyGymsService {
  const gymsRepository: GymRepository = {
    create: vi.fn(),
    findById: vi.fn(),
    findMany: vi.fn(),
    findManyNearby: vi.fn(async (): Promise<Gym[]> => {
      return getFakeGyms(gymsLength)
    }),
  }

  return new GetNearbyGymsService(gymsRepository)
}
