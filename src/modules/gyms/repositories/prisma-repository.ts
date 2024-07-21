import { appEnv } from '@/env'
import { prisma } from '@/lib/prisma'
import { getDegreesDeltaByDistanceMeters } from '@/utils/get-distance-between-coordinates'
import { Gym } from '@prisma/client'
import { CreateGymInput, FindManyNearbyInput, GymRepository } from './interface'

export class PrismaGymsRepository implements GymRepository {
  async findById(id: string): Promise<Gym | null> {
    return prisma.gym.findUnique({
      where: {
        id,
      },
    })
  }

  async findMany(query: string, page: number): Promise<Gym[]> {
    return prisma.gym.findMany({
      where: {
        name: {
          startsWith: query,
        },
      },
      take: appEnv.DEFAULT_PER_PAGE,
      skip: (page - 1) * appEnv.DEFAULT_PER_PAGE,
    })
  }

  async create(data: CreateGymInput): Promise<Gym> {
    return prisma.gym.create({
      data,
    })
  }

  findManyNearby({
    latitude,
    longitude,
    distanceInMeters,
    page,
  }: FindManyNearbyInput): Promise<Gym[]> {
    const { deltaLatitude, deltaLongitude } = getDegreesDeltaByDistanceMeters(
      distanceInMeters,
      latitude,
    )

    return prisma.gym.findMany({
      where: {
        latitude: {
          gte: latitude - deltaLatitude,
          lte: latitude + deltaLatitude,
        },
        longitude: {
          gte: longitude - deltaLongitude,
          lte: longitude + deltaLongitude,
        },
      },
      take: appEnv.DEFAULT_PER_PAGE,
      skip: (page - 1) * appEnv.DEFAULT_PER_PAGE,
    })
  }
}
