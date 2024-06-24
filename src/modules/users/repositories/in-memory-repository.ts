import { CreateUserInput, UserRepository, User } from './interface'

export class InMemoryUsersRepository implements UserRepository {
  private users: User[]

  constructor(users?: User[]) {
    this.users = users ?? []
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async create({ name, email, passwordHash }: CreateUserInput): Promise<User> {
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash,
      createdAt: new Date(),
    }
    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
