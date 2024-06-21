import { authenticate } from './controllers/authenticate'
import { create } from './controllers/create'
import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', create)
  app.post('/auth', authenticate)
}
