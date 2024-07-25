import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(routeRequiredRole: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== routeRequiredRole) {
      return reply.status(401).send({
        message: 'Unauthorized',
      })
    }
  }
}
