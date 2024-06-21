import { compare } from 'bcryptjs'
import { User, UserRepository } from '../repositories/interface'
import { InvalidCredentialsError } from './errors/invalid-credentials'

interface AuthenticateServiceInput {
  email: string
  password: string
}

interface AuthenticateServiceOutput {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceInput): Promise<AuthenticateServiceOutput> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }
    const passwordMatches = await compare(password, user.passwordHash)
    if (!passwordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
