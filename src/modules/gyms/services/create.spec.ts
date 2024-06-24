import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory-repository'
import { CreateGymService } from './create'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create User Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const input = {
      name: 'Test Gym',
      description: null,
      phone: null,
      latitude: -7.9599677,
      longitude: -34.8412848,
    }
    const { gym } = await sut.execute(input)

    expect(gym.id).toBeTruthy()
    expect(gym.name).toBe(input.name)
    expect(gym.description).toBe(input.description)
    expect(gym.phone).toBe(input.phone)
    expect(gym.latitude).toBe(input.latitude)
    expect(gym.longitude).toBe(input.longitude)
  })
})
