import { InMemoryGymsRepository } from '@gyms/repositories/in-memory-repository'
import { InMemoryUsersRepository } from '@users/repositories/in-memory-repository'
import { User } from '@users/repositories/interface'
import { randomUUID } from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory-repository'
import { CheckInService } from './check-in'
import { Gym } from '@gyms/repositories/interface'
import { GymNotFoundError } from '@gyms/errors/not-found'
import { UserNotFoundError } from '@users/errors/not-found'
import { SameDayCheckInError } from '@check-ins/errors/same-day-check-in'

const fakeUser: User = {
  id: randomUUID(),
  name: '',
  email: '',
  passwordHash: '',
  createdAt: new Date('2024-06-01'),
}
const fakeGym: Gym = {
  id: randomUUID(),
  name: '',
  latitude: 0,
  longitude: 0,
  createdAt: new Date('2024-06-01'),
}
let gymsRepository: InMemoryGymsRepository
let usersRepository: InMemoryUsersRepository
let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInService

describe('Check-in Service', () => {
  beforeEach(() => {
    const fakeUsers: User[] = [fakeUser]
    const fakeGyms: Gym[] = [fakeGym]

    checkInsRepository = new InMemoryCheckInsRepository()
    usersRepository = new InMemoryUsersRepository(fakeUsers)
    gymsRepository = new InMemoryGymsRepository(fakeGyms)

    sut = new CheckInService(
      checkInsRepository,
      usersRepository,
      gymsRepository,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: fakeUser.id,
      gymId: fakeGym.id,
    })

    expect(checkIn.id).toBeTruthy()
    expect(checkIn.gym.id).toBe(fakeGym.id)
    expect(checkIn.user.id).toBe(fakeUser.id)
  })

  it('should not be able to check in with invalid gym', async () => {
    await expect(
      sut.execute({
        userId: fakeUser.id,
        gymId: '123',
      }),
    ).rejects.toBeInstanceOf(GymNotFoundError)
  })

  it('should not be able to check in with invalid user', async () => {
    await expect(
      sut.execute({
        userId: '123',
        gymId: fakeGym.id,
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 8, 0, 0))
    const { checkIn } = await sut.execute({
      userId: fakeUser.id,
      gymId: fakeGym.id,
    })

    expect(checkIn.id).toBeTruthy()

    await expect(
      sut.execute({
        userId: fakeUser.id,
        gymId: fakeGym.id,
      }),
    ).rejects.toBeInstanceOf(SameDayCheckInError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 8, 0, 0))
    const { checkIn } = await sut.execute({
      userId: fakeUser.id,
      gymId: fakeGym.id,
    })

    expect(checkIn.id).toBeTruthy()

    vi.setSystemTime(new Date(2024, 0, 2, 8, 0, 0))

    const { checkIn: newCheckin } = await sut.execute({
      userId: fakeUser.id,
      gymId: fakeGym.id,
    })

    expect(newCheckin.id).toBeTruthy()
  })
})
