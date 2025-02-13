import { getFakeGyms } from '@/test/mocks/fake-entities'
import { Gym, GymRepository } from '@gyms/repositories/interface'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SearchGymsService } from './search-gyms'

const defaultGymsLength = 3
let sut: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(() => {
    sut = NewSearchGymsService(defaultGymsLength)
  })

  it('should be able to search gyms by name', async () => {
    const gyms = await sut.execute({
      query: 'Gym 1',
      page: 1,
    })

    // expect(gyms.gyms).toHaveLength(1)
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

function NewSearchGymsService(gymsLength: number): SearchGymsService {
  const gymsRepository: GymRepository = {
    create: vi.fn(),
    findById: vi.fn(),
    findMany: vi.fn(async (): Promise<Gym[]> => {
      return getFakeGyms(gymsLength)
    }),
    findManyNearby: vi.fn(),
  }

  return new SearchGymsService(gymsRepository)
}
