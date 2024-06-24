import { authenticate } from './controllers/authenticate'
import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.post('/auth', authenticate)
}
