export interface Gym {
  id: string
  name: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
  createdAt: Date
}

export interface GymRepository {
  findById(id: string): Promise<Gym | null>
}
