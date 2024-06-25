import { CheckIn } from '@check-ins/repositories/interface'
import { Gym } from '@gyms/repositories/interface'
import { InMemoryUsersRepository } from '@users/repositories/in-memory-repository'
import { User } from '@users/repositories/interface'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory-repository'
import { CountUserCheckInsService } from './count-user-check-ins'
import { UserNotFoundError } from '@users/errors/not-found'

const fakeUserId = 'user-01'
const totalCheckIns = 5
let sut: CountUserCheckInsService

describe('Check-in Service', () => {
  beforeEach(() => {
    sut = NewCountUserCheckInsService()
  })

  it('should be able to count user check ins', async () => {
    const checkIns = await sut.execute({
      userId: fakeUserId,
    })

    expect(checkIns.checkIns).toBe(totalCheckIns)
  })

  it('should not be able to count check ins for invalid user', async () => {
    expect(
      sut.execute({
        userId: 'invalid-user',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})

function NewCountUserCheckInsService(): CountUserCheckInsService {
  const fakeUser: User = {
    id: fakeUserId,
    name: '',
    email: '',
    passwordHash: '',
    createdAt: new Date('2024-06-01'),
  }

  const fakeGym: Gym = {
    id: randomUUID(),
    name: '',
    description: null,
    phone: null,
    latitude: 0,
    longitude: 0,
    createdAt: new Date('2024-06-01'),
  }

  const fakeCheckIns: CheckIn[] = Array.from({ length: totalCheckIns }, () => ({
    id: randomUUID(),
    validatedAt: null,
    user: fakeUser,
    gym: fakeGym,
    createdAt: new Date(),
  }))

  const fakeUsers: User[] = [fakeUser]

  const checkInsRepository = new InMemoryCheckInsRepository(fakeCheckIns)
  const usersRepository = new InMemoryUsersRepository(fakeUsers)

  return new CountUserCheckInsService(checkInsRepository, usersRepository)
}
