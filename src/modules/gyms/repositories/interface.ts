export interface FindManyNearbyInput {
  latitude: number
  longitude: number
  page: number
}

export interface CreateGymInput {
  name: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

export interface Gym {
  id: string
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
  createdAt: Date
}

export interface GymRepository {
  findById(id: string): Promise<Gym | null>
  findMany(query: string, page: number): Promise<Gym[]>
  create(data: CreateGymInput): Promise<Gym>
  findManyNearby(input: FindManyNearbyInput): Promise<Gym[]>
}
