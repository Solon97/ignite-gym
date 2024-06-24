export interface CreateUserInput {
  name: string
  email: string
  passwordHash: string
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
