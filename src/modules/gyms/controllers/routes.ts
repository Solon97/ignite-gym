import { verifyJwt } from '@middlewares/verify-jwt'
import { verifyUserRole } from '@middlewares/verify-user-role'
import { FastifyInstance } from 'fastify'
import { createGym } from './create'
import { getNearbyGyms } from './nearby'
import { searchGyms } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGym)
  app.get('/gyms/search', searchGyms)
  app.get('/gyms/nearby', getNearbyGyms)
}
