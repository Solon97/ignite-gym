import { verifyJwt } from '@middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { authenticate } from './auth'
import { createUser } from './create'
import { profile } from './profile'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth', authenticate)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
}
