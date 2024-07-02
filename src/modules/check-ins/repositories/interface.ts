import { CheckIn } from '@prisma/client'

export interface CreateCheckInInput {
  userId: string
  gymId: string
  validatedAt?: Date | null
}

export interface FindByUserInDateInput {
  userId: string
  checkInDate: Date
}

export interface CheckInRepository {
  create(input: CreateCheckInInput): Promise<CheckIn>
  save(input: CheckIn): Promise<CheckIn>
  findById(checkInId: string, userId: string): Promise<CheckIn | null>
  findByUserInDate(input: FindByUserInDateInput): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countCheckInsByUserId(userId: string): Promise<number>
}
