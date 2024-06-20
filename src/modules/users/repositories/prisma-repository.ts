import { prisma } from '@/lib/prisma'
import { CreateUserInput, IUserRepository, User } from './interface'

export class PrismaUsersRepository implements IUserRepository {
  async create(data: CreateUserInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return user
  }
}
