import { beforeEach, describe, expect, it } from 'vitest'
import { hashWithSalt } from '../common/hash'
import { InMemoryUsersRepository } from '../repositories/in-memory-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'john@test.com'
    const password = '123456'
    const user = await usersRepository.create({
      name: 'John Doe',
      email,
      passwordHash: await hashWithSalt(password),
    })

    const { user: authenticatedUser } = await sut.execute({
      email,
      password,
    })

    expect(authenticatedUser.id).toEqual(user.id)
  })

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'john@test.com'
    const password = '123456'
    const user = await usersRepository.create({
      name: 'John Doe',
      email,
      passwordHash: await hashWithSalt(password),
    })

    const { user: authenticatedUser } = await sut.execute({
      email,
      password,
    })

    expect(authenticatedUser.id).toEqual(user.id)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'john@test.com'
    const password = '123456'

    await expect(async () => {
      await sut.execute({
        email,
        password,
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate', async () => {
    const email = 'john@test.com'
    const password = '123123'
    const wrongPassword = '123456'
    await usersRepository.create({
      name: 'John Doe',
      email,
      passwordHash: await hashWithSalt(password),
    })

    await expect(async () => {
      await sut.execute({
        email,
        password: wrongPassword,
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
