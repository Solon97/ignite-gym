import { beforeEach, describe, expect, it } from 'vitest'
import { hashWithSalt } from '../common/hash'
import { UserNotFoundError } from '../errors/not-found'
import { InMemoryUsersRepository } from '../repositories/in-memory-repository'
import { GetUserProfileService } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const name = 'John Doe'
    const email = 'john@test.com'
    const password = '123456'

    const { id } = await usersRepository.create({
      name: 'John Doe',
      email,
      passwordHash: await hashWithSalt(password),
    })

    const { user } = await sut.execute({
      userId: id,
    })

    expect(user.id).toBe(id)
    expect(user.name).toBe(name)
    expect(user.email).toBe(email)
    expect(user.passwordHash).toBeTruthy()
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
