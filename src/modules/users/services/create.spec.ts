import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory-repository'
import { CreateUserService } from './create'
import { UserAlreadyExistsError } from './errors/already-exists'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserService

describe('Create User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserService(usersRepository)
  })

  it('should be able to create user', async () => {
    const name = 'John Doe'
    const email = 'john@test.com'
    const password = '123456'

    const { user } = await sut.execute({
      name,
      email,
      password,
    })

    expect(user.id).toBeTruthy()
    expect(user.name).toBe(name)
    expect(user.email).toBe(email)
    expect(user.passwordHash).toBeTruthy()
  })

  it('should hash user password upon creation', async () => {
    const password = '123456'

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john@test.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(password, user.passwordHash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create user with same email twice', async () => {
    const email = 'john@test.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
