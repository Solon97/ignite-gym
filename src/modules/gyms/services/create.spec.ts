import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CreateGymService } from './create'
import {
  CreateGymInput,
  Gym,
  GymRepository,
} from '@gyms/repositories/interface'

let gymsRepository: GymRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
  beforeEach(() => {
    gymsRepository = {
      create: vi.fn(
        async ({
          name,
          description,
          phone,
          latitude,
          longitude,
        }: CreateGymInput): Promise<Gym> => {
          return {
            id: 'gym-01',
            name,
            description: description ?? null,
            phone: phone ?? null,
            latitude,
            longitude,
            createdAt: new Date(),
          }
        },
      ),
      findById: vi.fn(),
      findMany: vi.fn(),
    }
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
