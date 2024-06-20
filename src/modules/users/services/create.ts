import { hash } from 'bcryptjs'
import { IUserRepository } from '../repositories/interface'

interface CreateRequest {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  constructor(private repository: IUserRepository) {}

  async execute({ name, email, password }: CreateRequest) {
    const userWithSameEmail = await this.repository.findByEmail(email)
    if (userWithSameEmail) {
      throw new Error('email already exists')
    }
    const passwordHash = await hash(password, 6)

    await this.repository.create({ name, passwordHash, email })
  }
}
