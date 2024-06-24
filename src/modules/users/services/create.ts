import { hashWithSalt } from '../common/hash'
import { User, UserRepository } from '../repositories/interface'
import { UserAlreadyExistsError } from '../errors/already-exists'

interface CreateServiceInput {
  name: string
  email: string
  password: string
}

interface CreateServiceOutput {
  user: User
}

export class CreateUserService {
  constructor(private repository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateServiceInput): Promise<CreateServiceOutput> {
    const userWithSameEmail = await this.repository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    const passwordHash = await hashWithSalt(password)

    const user = await this.repository.create({ name, passwordHash, email })

    return {
      user,
    }
  }
}
