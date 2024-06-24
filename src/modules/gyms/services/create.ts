import { InvalidCoordinatesError } from '@gyms/errors/invalid-coordinates'
import { GymRepository, Gym } from '@gyms/repositories/interface'

interface CreateServiceInput {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateServiceOutput {
  gym: Gym
}

export class CreateGymService {
  constructor(private repository: GymRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateServiceInput): Promise<CreateServiceOutput> {
    if (latitude === 0 || longitude === 0) {
      throw new InvalidCoordinatesError()
    }
    const gym = await this.repository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
