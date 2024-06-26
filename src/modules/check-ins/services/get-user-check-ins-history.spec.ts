import {
  getFakeCheckIns,
  getFakeGym,
  getFakeUser,
} from '@/test/mocks/fake-entities'
import { CheckIn, CheckInRepository } from '@check-ins/repositories/interface'
import { UserNotFoundError } from '@users/errors/not-found'
import { User, UserRepository } from '@users/repositories/interface'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GetUserCheckInsHistoryService } from './get-user-check-ins-history'

const fakeUserId = 'user-01'
const totalCheckIns = 5
let sut: GetUserCheckInsHistoryService

describe('Get User Check-ins History Service', () => {
  beforeEach(() => {
    sut = NewGetUserCheckInsHistoryService()
  })

  it('should be able to get user check ins history', async () => {
    const checkIns = await sut.execute({
      userId: fakeUserId,
    })

    expect(checkIns.checkIns.length).toBe(totalCheckIns)
  })

  it('should not be able to get user check ins history for invalid user', async () => {
    expect(
      sut.execute({
        userId: 'invalid-user',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})

function NewGetUserCheckInsHistoryService(): GetUserCheckInsHistoryService {
  const usersRepository: UserRepository = {
    create: vi.fn(),
    findByEmail: vi.fn(),
    findById: vi.fn(
      async (id: string): Promise<User | null> =>
        id === fakeUserId ? getFakeUser(fakeUserId) : null,
    ),
  }

  const checkInsRepository: CheckInRepository = {
    create: vi.fn(),
    countCheckInsByUserId: vi.fn(),
    findByUserInDate: vi.fn(),
    findManyByUserId: vi.fn(async (userId: string): Promise<CheckIn[]> => {
      if (userId !== fakeUserId) {
        return []
      }

      return getFakeCheckIns({
        gym: getFakeGym({}),
        user: getFakeUser(fakeUserId),
        length: totalCheckIns,
      })
    }),
  }

  return new GetUserCheckInsHistoryService(checkInsRepository, usersRepository)
}
