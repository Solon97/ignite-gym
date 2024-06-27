import { Gym } from '@gyms/repositories/interface'
import { User } from '@users/repositories/interface'

export interface CreateCheckInInput {
  userId: string
  gymId: string
  validatedAt?: Date | null
}

export interface FindByUserInDateInput {
  userId: string
  checkInDate: Date
}

export interface CheckIn {
  id: string
  validatedAt: Date | null
  user: User
  gym: Gym
  createdAt: Date
}

export interface CheckInRepository {
  create(input: CreateCheckInInput): Promise<CheckIn>
  findByUserInDate(input: FindByUserInDateInput): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countCheckInsByUserId(userId: string): Promise<number>
}
