/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { CreateUserInput, PublicUserData, UserRepository } from './interface'

export class PrismaUsersRepository implements UserRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return this.getPublicUserData(user)
  }

  async create(data: CreateUserInput) {
    const user = await prisma.user.create({
      data,
    })
    return this.getPublicUserData(user)
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return this.getPublicUserData(user)
  }

  private getPublicUserData(user: User): PublicUserData {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    }
  }
}
