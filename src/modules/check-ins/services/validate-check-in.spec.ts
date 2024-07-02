import { getFakeCheckIn, getFakeUser } from '@/test/mocks/fake-entities'
import { CheckInNotFoundError } from '@check-ins/errors/not-found'
import { CheckInRepository } from '@check-ins/repositories/interface'
import { UserNotFoundError } from '@users/errors/not-found'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  MAX_MINUTES_VALIDATE_CHECK_IN,
  ValidateCheckInService,
} from './validate-check-in'
import { LateCheckInError } from '@check-ins/errors/late-check-in'
import { CheckIn, User } from '@prisma/client'

const validUserId = 'test-user'
const validCheckInId = 'test-checkIn'

let sutRepository: CheckInRepository
let sut: ValidateCheckInService

describe('Validate Check-in Service', () => {
  beforeEach(() => {
    sut = newSut()
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const { checkIn } = await sut.execute({
      userId: validUserId,
      checkInId: validCheckInId,
    })

    expect(checkIn.id).toBe(validCheckInId)
    expect(checkIn.user_id).toBe(validUserId)
    expect(checkIn.validatedAt).toBeTruthy()
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(async () =>
      sut.execute({
        userId: validUserId,
        checkInId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(CheckInNotFoundError)
  })

  it('should not be able to validate the check-in of a non-existent user', async () => {
    await expect(async () =>
      sut.execute({
        userId: 'invalid-user',
        checkInId: validCheckInId,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('should be able to validate the check in, within twenty minutes after creation', async () => {
    const { checkIn } = await sut.execute({
      userId: validUserId,
      checkInId: validCheckInId,
    })

    const date = new Date(2024, 6, 1, 13)
    vi.setSystemTime(date)

    sut = newSut()

    const datePlusFiveMinutes = new Date(2024, 6, 1, 13, 5)
    vi.setSystemTime(datePlusFiveMinutes)

    expect(checkIn.id).toBe(validCheckInId)
    expect(checkIn.user_id).toBe(validUserId)
    expect(checkIn.validatedAt).toBeTruthy()
  })

  it('should not be able to validate check-in more than twenty minutes after creation', async () => {
    const date = new Date(2024, 6, 1, 13)
    vi.setSystemTime(date)

    sut = newSut()
    const exceededTimeMinutes = MAX_MINUTES_VALIDATE_CHECK_IN + 1
    const datePlusThirtyMinutes = new Date(2024, 6, 1, 13, exceededTimeMinutes)
    vi.setSystemTime(datePlusThirtyMinutes)

    await expect(async () =>
      sut.execute({
        userId: validUserId,
        checkInId: validCheckInId,
      }),
    ).rejects.toBeInstanceOf(LateCheckInError)
  })
})

function newSut(
  checkInsRepository?: CheckInRepository,
): ValidateCheckInService {
  const checkInDate = new Date()

  const usersRepository = {
    create: vi.fn(),
    findByEmail: vi.fn(),
    findById: vi.fn(
      async (id: string): Promise<User | null> =>
        id === validUserId ? getFakeUser(id) : null,
    ),
  }

  sutRepository = checkInsRepository ?? {
    create: vi.fn(),
    countCheckInsByUserId: vi.fn(),
    findByUserInDate: vi.fn(),
    findManyByUserId: vi.fn(),
    findById: vi.fn(
      async (checkInId, userId): Promise<CheckIn | null> =>
        checkInId === validCheckInId
          ? getFakeCheckIn({ id: checkInId, userId, date: checkInDate })
          : null,
    ),
    save: vi.fn(),
  }

  return new ValidateCheckInService(sutRepository, usersRepository)
}
