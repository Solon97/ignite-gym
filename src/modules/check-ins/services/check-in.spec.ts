import {
  getFakeCheckIn,
  getFakeGym,
  getFakeUser,
} from '@/test/mocks/fake-entities'
import { DistantGymCheckInError } from '@check-ins/errors/distant-gym-check-in'
import { MaxNumberCheckInsError } from '@check-ins/errors/max-number-check-ins'
import {
  CheckIn,
  CheckInRepository,
  CreateCheckInInput,
  FindByUserInDateInput,
} from '@check-ins/repositories/interface'
import { GymNotFoundError } from '@gyms/errors/not-found'
import { Gym } from '@gyms/repositories/interface'
import { UserNotFoundError } from '@users/errors/not-found'
import { User } from '@users/repositories/interface'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInService } from './check-in'

const validUserId = 'test-user'
const validGymId = 'test-gym'

let sutRepository: CheckInRepository
let sut: CheckInService

describe('Check-in Service', () => {
  beforeEach(() => {
    sut = newSut()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: validUserId,
      gymId: validGymId,
      userCoordinates: {
        latitude: 0,
        longitude: 0,
      },
    })

    expect(checkIn.id).toBeTruthy()
    expect(checkIn.gym.id).toBe(validGymId)
    expect(checkIn.user.id).toBe(validUserId)
  })

  it('should not be able to check in with invalid gym', async () => {
    await expect(
      sut.execute({
        userId: validUserId,
        gymId: 'invalid_id',
        userCoordinates: {
          latitude: 0,
          longitude: 0,
        },
      }),
    ).rejects.toBeInstanceOf(GymNotFoundError)
  })

  it('should not be able to check in with invalid user', async () => {
    await expect(
      sut.execute({
        userId: 'invalid_id',
        gymId: validGymId,
        userCoordinates: {
          latitude: 0,
          longitude: 0,
        },
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('should not be able to check in twice in the same day', async () => {
    sutRepository = {
      ...sutRepository,
      findByUserInDate: vi.fn(async ({ userId }: FindByUserInDateInput) =>
        userId === validUserId
          ? getFakeCheckIn({
              userId,
            })
          : null,
      ),
    }

    sut = newSut(sutRepository)

    await expect(
      sut.execute({
        userId: validUserId,
        gymId: validGymId,
        userCoordinates: {
          latitude: 0,
          longitude: 0,
        },
      }),
    ).rejects.toBeInstanceOf(MaxNumberCheckInsError)
  })

  it('should not be able to check in on distant gym', async () => {
    await expect(
      sut.execute({
        userId: validUserId,
        gymId: validGymId,
        userCoordinates: {
          latitude: -7.6871862, // ? when compared with latitude and longitude 0
          longitude: -34.8351681,
        },
      }),
    ).rejects.toBeInstanceOf(DistantGymCheckInError)
  })
})

function newSut(checkInsRepository?: CheckInRepository): CheckInService {
  const usersRepository = {
    create: vi.fn(),
    findByEmail: vi.fn(),
    findById: vi.fn(
      async (id: string): Promise<User | null> =>
        id === validUserId ? getFakeUser(id) : null,
    ),
  }

  const gymsRepository = {
    create: vi.fn(),
    findById: vi.fn(
      async (id: string): Promise<Gym | null> =>
        id === validGymId ? getFakeGym({ id }) : null,
    ),
  }

  sutRepository = checkInsRepository ?? {
    create: vi.fn(
      async ({ gymId, userId }: CreateCheckInInput): Promise<CheckIn> =>
        getFakeCheckIn({
          gymId,
          userId,
        }),
    ),
    countCheckInsByUserId: vi.fn(),
    findByUserInDate: vi.fn(),
    findManyByUserId: vi.fn(),
  }

  return new CheckInService(sutRepository, usersRepository, gymsRepository)
}
