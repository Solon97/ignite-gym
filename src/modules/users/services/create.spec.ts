import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { MockUsersRepository } from '../repositories/in-memory-repository'
import { CreateUserService } from './create'
import { UserAlreadyExistsError } from './errors/already-exists'

describe('Create User Service', () => {
  it('should be able to create user', async () => {
    const createService = new CreateUserService(new MockUsersRepository())
    const name = 'John Doe'
    const email = 'john@test.com'
    const password = '123456'
    const { user } = await createService.execute({
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
    const createService = new CreateUserService(new MockUsersRepository())
    const password = '123456'

    const { user } = await createService.execute({
      name: 'John Doe',
      email: 'john@test.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(password, user.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create user with same email twice', async () => {
    const createService = new CreateUserService(new MockUsersRepository())
    const email = 'john@test.com'

    await createService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      createService.execute({
        name: 'John Doe',
        email,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
