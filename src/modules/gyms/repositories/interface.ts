export interface GymCreateInput {
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
  create(data: GymCreateInput): Promise<Gym>
}
