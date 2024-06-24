import { randomUUID } from 'node:crypto'
import { Gym, GymCreateInput, GymRepository } from './interface'

export class InMemoryGymsRepository implements GymRepository {
  gyms: Gym[]

  constructor(gyms?: Gym[]) {
    this.gyms = gyms ?? []
  }

  async create({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: randomUUID(),
      name,
      description: description ?? null,
      phone: phone ?? null,
      latitude,
      longitude,
      createdAt: new Date(),
    }
    this.gyms.push(gym)

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id)

    return gym ?? null
  }
}
