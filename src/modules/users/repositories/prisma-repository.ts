/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@/lib/prisma'
import { CreateUserInput, UserRepository, User } from './interface'

export class PrismaUsersRepository implements UserRepository {
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

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
