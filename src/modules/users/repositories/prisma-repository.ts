/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { CreateUserInput, UserRepository } from './interface'

export class PrismaUsersRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return user
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
