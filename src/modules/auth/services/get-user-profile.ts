import { UserNotFoundError } from '@users/errors/not-found'
import { PublicUserData, UserRepository } from '@users/repositories/interface'

interface GetUserProfileServiceInput {
  userId: string
}

interface GetUserProfileServiceOutput {
  user: PublicUserData
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
