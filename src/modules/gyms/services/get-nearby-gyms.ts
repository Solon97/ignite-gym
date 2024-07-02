import { Gym, GymRepository } from '@gyms/repositories/interface'

interface GetNearbyGymsServiceInput {
  userLatitude: number
  userLongitude: number
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
  }: GetNearbyGymsServiceInput): Promise<GetNearbyGymsServiceOutput> {
    const gyms = await this.repository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      page,
    })

    return {
      gyms,
    }
  }
}
