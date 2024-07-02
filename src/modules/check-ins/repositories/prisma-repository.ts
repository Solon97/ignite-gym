import { prisma } from '@/lib/prisma'
import { CheckIn } from '@prisma/client'
import {
  CheckInRepository,
  CreateCheckInInput,
  FindByUserInDateInput,
} from './interface'
import dayjs from 'dayjs'
import { env } from '@/env'

export class PrismaCheckInsRepository implements CheckInRepository {
  async create({
    gymId,
    userId,
    validatedAt,
  }: CreateCheckInInput): Promise<CheckIn> {
    return prisma.checkIn.create({
      data: {
        gymId,
        userId,
        validatedAt,
      },
    })
  }

  save(input: CheckIn): Promise<CheckIn> {
    return prisma.checkIn.update({
      data: input,
      where: {
        id: input.id,
      },
    })
  }

  async findById(checkInId: string, userId: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        id: checkInId,
        userId,
      },
      include: {
        user: true,
        gym: true,
      },
    })

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  findByUserInDate({
    userId,
    checkInDate,
  }: FindByUserInDateInput): Promise<CheckIn | null> {
    const startDate: Date = dayjs(checkInDate).startOf('day').toDate()
    const endDate = dayjs(checkInDate).endOf('day').toDate()
    return prisma.checkIn.findFirst({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        userId,
      },
    })
  }

  findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return prisma.checkIn.findMany({
      where: {
        userId,
      },
      skip: page * env.DEFAULT_PER_PAGE,
      take: env.DEFAULT_PER_PAGE,
    })
  }

  countCheckInsByUserId(userId: string): Promise<number> {
    return prisma.checkIn.count({
      where: {
        userId,
      },
    })
  }
}
