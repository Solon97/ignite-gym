import dayjs from 'dayjs'
import {
  CheckIn,
  CheckInRepository,
  CreateCheckInInput,
  FindByUserInDateInput,
} from './interface'

export class InMemoryCheckInsRepository implements CheckInRepository {
  private checkIns: CheckIn[]

  constructor(checkIns?: CheckIn[]) {
    this.checkIns = checkIns ?? []
  }

  async findByUserInDate({
    userId,
    checkInDate,
  }: FindByUserInDateInput): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(checkInDate).startOf('date')
    const endOfTheDay = dayjs(checkInDate).endOf('date')

    const checkIn = this.checkIns.find((checkIn) => {
      const date = dayjs(checkIn.createdAt)

      return (
        checkIn.user.id === userId &&
        date.isAfter(startOfTheDay) &&
        date.isBefore(endOfTheDay)
      )
    })

    return checkIn ?? null
  }

  async create(input: CreateCheckInInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: crypto.randomUUID(),
      user: {
        id: input.userId,
        name: '',
        email: '',
        passwordHash: '',
        createdAt: new Date(),
      },
      gym: {
        id: input.gymId,
        name: '',
        latitude: 0,
        longitude: 0,
        createdAt: new Date(),
      },
      createdAt: new Date(),
      validatedAt: input.validatedAt ?? null,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
