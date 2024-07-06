import { GymRepository } from '@gyms/repositories/interface'
import { Gym } from '@prisma/client'

interface GetNearbyGymsServiceInput {
  userLatitude: number
  userLongitude: number
  distanceInMeters: number
  page: number
}

interface GetNearbyGymsServiceOutput {
  gyms: Gym[]
}

export class GetNearbyGymsService {
  constructor(private repository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
    page,
    distanceInMeters,
  }: GetNearbyGymsServiceInput): Promise<GetNearbyGymsServiceOutput> {
    const gyms = await this.repository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      page,
      distanceInMeters,
    })

    return {
      gyms,
    }
  }
}
