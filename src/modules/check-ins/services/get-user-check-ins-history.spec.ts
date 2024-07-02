import { env } from '@/env'
import { getFakeCheckIns, getFakeUser } from '@/test/mocks/fake-entities'
import { CheckInRepository } from '@check-ins/repositories/interface'
import { CheckIn, User } from '@prisma/client'
import { UserNotFoundError } from '@users/errors/not-found'
import { UserRepository } from '@users/repositories/interface'
import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GetUserCheckInsHistoryService } from './get-user-check-ins-history'

const fakeUserId = 'user-01'
const defaultCheckInsLength = 3
let sut: GetUserCheckInsHistoryService

describe('Get User Check-ins History Service', () => {
  beforeEach(() => {
    sut = NewGetUserCheckInsHistoryService(defaultCheckInsLength)
  })

  it('should be able to get user check ins history', async () => {
    const checkIns = await sut.execute({
      userId: fakeUserId,
      page: 1,
    })

    expect(checkIns.checkIns).toHaveLength(defaultCheckInsLength)
    expect(checkIns.checkIns).toEqual([
      expect.objectContaining({
        id: 'checkin-1',
        user_id: fakeUserId,
      }),
      expect.objectContaining({
        id: 'checkin-2',
        user_id: fakeUserId,
      }),
      expect.objectContaining({
        id: 'checkin-3',
        user_id: fakeUserId,
      }),
    ])
  })

  it('should not be able to get user check ins history for invalid user', async () => {
    expect(
      sut.execute({
        userId: 'invalid-user',
        page: 1,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('should be able to get paginated check-in history', async () => {
    const checkInsLength = env.DEFAULT_PER_PAGE + 2
    sut = NewGetUserCheckInsHistoryService(checkInsLength)

    const checkIns = await sut.execute({
      userId: fakeUserId,
      page: 2,
    })

    expect(checkIns.checkIns).toHaveLength(2)
    expect(checkIns.checkIns).toEqual([
      expect.objectContaining({
        id: `checkin-${checkInsLength - 1}`,
        user_id: fakeUserId,
      }),
      expect.objectContaining({
        id: `checkin-${checkInsLength}`,
        user_id: fakeUserId,
      }),
    ])
  })
})

function NewGetUserCheckInsHistoryService(
  checkInsLength: number,
): GetUserCheckInsHistoryService {
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
    findManyByUserId: vi.fn(async (userId, page): Promise<CheckIn[]> => {
      if (userId !== fakeUserId) {
        return []
      }

      const checkIns = getFakeCheckIns({
        gymId: randomUUID(),
        userId: fakeUserId,
        length: checkInsLength,
      })

      return checkIns.slice(
        (page - 1) * env.DEFAULT_PER_PAGE,
        page * env.DEFAULT_PER_PAGE,
      )
    }),
    findById: vi.fn(),
    save: vi.fn(),
  }

  return new GetUserCheckInsHistoryService(checkInsRepository, usersRepository)
}
