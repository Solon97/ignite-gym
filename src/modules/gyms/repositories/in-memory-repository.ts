import { Gym, GymRepository } from './interface'

export class InMemoryGymsRepository implements GymRepository {
  private gyms: Gym[]

  constructor(gyms?: Gym[]) {
    this.gyms = gyms ?? []
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    return gym ?? null
  }
}
