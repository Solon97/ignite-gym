import { FastifyInstance } from 'fastify'
import request from 'supertest'

interface AuthResponse {
  token: string
}

export async function createAndAuthUser(
  app: FastifyInstance,
): Promise<AuthResponse> {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john@test.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/auth').send({
    email: 'john@test.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
