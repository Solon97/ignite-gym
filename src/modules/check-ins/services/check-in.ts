import { SameDayCheckInError } from '@check-ins/errors/same-day-check-in'
import { CheckIn, CheckInRepository } from '@check-ins/repositories/interface'
import { GymNotFoundError } from '@gyms/errors/not-found'
import { GymRepository } from '@gyms/repositories/interface'
import { UserNotFoundError } from '@users/errors/not-found'
import { UserRepository } from '@users/repositories/interface'

interface CheckInServiceInput {
  userId: string
  gymId: string
}

interface CheckInServiceOutput {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInRepository,
    private usersRepository: UserRepository,
    private gymsRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInServiceInput): Promise<CheckInServiceOutput> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }

    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) {
      throw new GymNotFoundError()
    }

    const sameDayCheckIn = await this.checkInsRepository.findByUserInDate({
      checkInDate: new Date(),
      userId: user.id,
    })

    if (sameDayCheckIn) {
      throw new SameDayCheckInError()
    }

    const checkIn = await this.checkInsRepository.create({
      userId: user.id,
      gymId: gym.id,
    })

    return {
      checkIn,
    }
  }
}
