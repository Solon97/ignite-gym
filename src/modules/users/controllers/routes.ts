import { verifyJwt } from '@middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './auth'
import { createUser } from './create-user'
import { profile } from './get-user-profile'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth', authenticate)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
}
