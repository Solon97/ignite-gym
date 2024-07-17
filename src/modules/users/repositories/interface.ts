import { User } from '@prisma/client'

export interface CreateUserInput {
  name: string
  email: string
  passwordHash: string
}

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(input: CreateUserInput): Promise<User>
}
