import { SameDayCheckInError } from '@check-ins/errors/same-day-check-in'
import { CheckIn, CheckInRepository } from '@check-ins/repositories/interface'
import { GymNotFoundError } from '@gyms/errors/not-found'
import { GymRepository } from '@gyms/repositories/interface'
import { UserNotFoundError } from '@users/errors/not-found'
import { User, UserRepository } from '@users/repositories/interface'
import { CheckinGeoValidator } from './validations/geo-validator'

interface CheckInServiceCoordinates {
  latitude: number
  longitude: number
}
interface CheckInServiceInput {
  userId: string
  gymId: string
  userCoordinates: CheckInServiceCoordinates
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
    userCoordinates,
  }: CheckInServiceInput): Promise<CheckInServiceOutput> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new UserNotFoundError()
    }
    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) {
      throw new GymNotFoundError()
    }

    await this.validateDate(user)

    CheckinGeoValidator.execute(
      {
        latitude: userCoordinates.latitude,
        longitude: userCoordinates.longitude,
      },
      {
        latitude: gym.latitude,
        longitude: gym.longitude,
      },
    )

    const checkIn = await this.checkInsRepository.create({
      userId: user.id,
      gymId: gym.id,
    })

    return {
      checkIn,
    }
  }

  private async validateDate(user: User) {
    const sameDayCheckIn = await this.checkInsRepository.findByUserInDate({
      checkInDate: new Date(),
      userId: user.id,
    })

    if (sameDayCheckIn) {
      throw new SameDayCheckInError()
    }
  }
}
