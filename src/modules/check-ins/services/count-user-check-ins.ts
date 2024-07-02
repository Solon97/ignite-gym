import { CheckInRepository } from '@check-ins/repositories/interface'
import { UserNotFoundError } from '@users/errors/not-found'
import { UserRepository } from '@users/repositories/interface'

interface CountUserCheckInsServiceInput {
  userId: string
}

interface CountUserCheckInsServiceOutput {
  checkIns: number
}

export class CountUserCheckInsService {
  constructor(
    private checkInsRepository: CheckInRepository,
    private usersRepository: UserRepository,
  ) {}

  async execute({
    userId,
  }: CountUserCheckInsServiceInput): Promise<CountUserCheckInsServiceOutput> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    const checkIns = await this.checkInsRepository.countCheckInsByUserId(userId)

    return {
      checkIns,
    }
  }
}
