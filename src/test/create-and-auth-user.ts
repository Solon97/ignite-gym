import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface AuthResponse {
  token: string
}

export async function createAndAuthUser(
  app: FastifyInstance,
  isAdmin = false,
): Promise<AuthResponse> {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@test.com',
      passwordHash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/auth').send({
    email: 'john@test.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
