import { getFakeUser } from '@/test/mocks/fake-entities'
import { CheckInRepository } from '@check-ins/repositories/interface'
import { User } from '@prisma/client'
import { UserNotFoundError } from '@users/errors/not-found'
import { UserRepository } from '@users/repositories/interface'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CountUserCheckInsService } from './count-user-check-ins'

const fakeUserId = 'user-01'
const totalCheckIns = 5
let sut: CountUserCheckInsService

describe('Count User Check-in Service', () => {
  beforeEach(() => {
    sut = NewSut()
  })

  it('should be able to count user check ins', async () => {
    const checkIns = await sut.execute({
      userId: fakeUserId,
    })

    expect(checkIns.checkInsCount).toBe(totalCheckIns)
  })

  it('should not be able to count check ins for invalid user', async () => {
    expect(
      sut.execute({
        userId: 'invalid-user',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})

function NewSut(): CountUserCheckInsService {
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
    countCheckInsByUserId: vi.fn(
      async (userId: string): Promise<number> =>
        userId === fakeUserId ? totalCheckIns : 0,
    ),
    findByUserInDate: vi.fn(),
    findManyByUserId: vi.fn(),
    findById: vi.fn(),
    save: vi.fn(),
  }

  return new CountUserCheckInsService(checkInsRepository, usersRepository)
}
