import { LateCheckInError } from '@check-ins/errors/late-check-in'
import { CheckInNotFoundError } from '@check-ins/errors/not-found'
import { CheckIn, CheckInRepository } from '@check-ins/repositories/interface'
import { UserNotFoundError } from '@users/errors/not-found'
import { UserRepository } from '@users/repositories/interface'
import dayjs from 'dayjs'

export const MAX_MINUTES_VALIDATE_CHECK_IN = 20

interface ValidateCheckInInput {
  userId: string
  checkInId: string
}

interface ValidateCheckInOutput {
  checkIn: CheckIn
}

export class ValidateCheckInService {
  constructor(
    private checkInsRepository: CheckInRepository,
    private usersRepository: UserRepository,
  ) {}

  async execute({
    userId,
    checkInId,
  }: ValidateCheckInInput): Promise<ValidateCheckInOutput> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    const checkIn = await this.checkInsRepository.findById(checkInId, userId)
    if (!checkIn) {
      throw new CheckInNotFoundError()
    }

    checkIn.validatedAt = new Date()

    const dateDiff = dayjs(checkIn.validatedAt).diff(
      checkIn.createdAt,
      'minute',
    )

    console.log(dateDiff)
    if (dateDiff > MAX_MINUTES_VALIDATE_CHECK_IN) {
      throw new LateCheckInError()
    }

    await this.checkInsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
