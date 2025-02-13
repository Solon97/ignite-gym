import { CheckIn, CheckInRepository } from '@check-ins/repositories/interface'
import { UserNotFoundError } from '@users/errors/not-found'
import { UserRepository } from '@users/repositories/interface'

interface GetUserCheckInsHistoryServiceInput {
  userId: string
  page: number
}

interface GetUserCheckInsHistoryServiceOutput {
  checkIns: CheckIn[]
}

export class GetUserCheckInsHistoryService {
  constructor(
    private checkInsRepository: CheckInRepository,
    private usersRepository: UserRepository,
  ) { }

  async execute({
    userId,
    page,
  }: GetUserCheckInsHistoryServiceInput): Promise<GetUserCheckInsHistoryServiceOutput> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )
    return {
      checkIns,
    }
  }
}
