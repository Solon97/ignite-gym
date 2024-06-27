import { env } from '@/env'
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
    ])
  })

  it('should be able to get paginated gyms', async () => {
    const gymsLength = env.DEFAULT_PER_PAGE + 2
    sut = NewSearchGymsService(gymsLength)

    const gyms = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms.gyms).toHaveLength(2)
    expect(gyms.gyms).toEqual([
      expect.objectContaining({
        id: `gym-${gymsLength - 1}`,
      }),
      expect.objectContaining({
        id: `gym-${gymsLength}`,
      }),
    ])
  })
})

function NewSearchGymsService(gymsLength: number): SearchGymsService {
  const gymsRepository: GymRepository = {
    create: vi.fn(),
    findById: vi.fn(),
    findMany: vi.fn(async (query: string, page: number): Promise<Gym[]> => {
      const gyms = getFakeGyms(gymsLength)

      return gyms
        .filter((gym) => gym.name.includes(query))
        .slice((page - 1) * env.DEFAULT_PER_PAGE, page * env.DEFAULT_PER_PAGE)
    }),
  }

  return new SearchGymsService(gymsRepository)
}
