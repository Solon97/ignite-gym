export interface CreateUserInput {
  name: string
  email: string
  passwordHash: string
}

export interface PublicUserData {
  id: string
  name: string
  email: string
  createdAt: Date
}

export interface UserRepository {
  findById(id: string): Promise<PublicUserData | null>
  findByEmail(email: string): Promise<PublicUserData | null>
  create(input: CreateUserInput): Promise<PublicUserData>
}
