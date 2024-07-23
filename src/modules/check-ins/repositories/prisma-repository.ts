import { appEnv } from '@/env'
import { prisma } from '@/lib/prisma'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import {
  CheckInRepository,
  CreateCheckInInput,
  FindByUserInDateInput,
} from './interface'

export class PrismaCheckInsRepository implements CheckInRepository {
  async create(data: CreateCheckInInput) {
    return prisma.checkIn.create({
      data,
    })
  }

  save({ id, gymId, userId, validatedAt }: CheckIn) {
    return prisma.checkIn.update({
      data: {
        id,
        gymId,
        validatedAt,
        userId,
      },
      where: {
        id,
      },
    })
  }

  async findById(checkInId: string, userId: string) {
    const checkIn = await prisma.checkIn.findUnique({
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

  findByUserInDate({ userId, checkInDate }: FindByUserInDateInput) {
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

  findManyByUserId(userId: string, page: number) {
    return prisma.checkIn.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * appEnv.DEFAULT_PER_PAGE,
      take: appEnv.DEFAULT_PER_PAGE,
    })
  }

  countCheckInsByUserId(userId: string) {
    return prisma.checkIn.count({
      where: {
        userId,
      },
    })
  }
}
