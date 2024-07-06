import { prisma } from '@/lib/prisma'
import { CheckIn } from '@prisma/client'
import {
  CheckInRepository,
  CreateCheckInInput,
  FindByUserInDateInput,
} from './interface'
import dayjs from 'dayjs'
import { appEnv } from '@/env'

export class PrismaCheckInsRepository implements CheckInRepository {
  async create(data: CreateCheckInInput) {
    return prisma.checkIn.create({
      data,
    })
  }

  save(input: CheckIn) {
    return prisma.checkIn.update({
      data: input,
      where: {
        id: input.id,
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
      skip: page * appEnv.DEFAULT_PER_PAGE,
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
