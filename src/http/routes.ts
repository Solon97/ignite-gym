import { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/auth'
import { createUser } from './controllers/create-user'
import { profile } from './controllers/get-user-profile'
import { verifyJwt } from './middlewares/verify-jwt'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth', authenticate)
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)
}
