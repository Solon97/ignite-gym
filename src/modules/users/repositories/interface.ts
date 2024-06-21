export interface CreateUserInput {
  id?: string
  name: string
  email: string
  passwordHash: string
  createdAt?: Date
}

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: Date
}

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(input: CreateUserInput): Promise<User>
}
