import { User, UserRepository } from '../repositories/interface'
import { UserNotFoundError } from '../errors/not-found'

interface GetUserProfileServiceInput {
  userId: string
}

interface GetUserProfileServiceOutput {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceInput): Promise<GetUserProfileServiceOutput> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    return {
      user,
    }
  }
}
