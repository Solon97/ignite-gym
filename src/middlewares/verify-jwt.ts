import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify().catch(() => {
    return reply.status(401).send({
      message: 'Unauthorized',
    })
  })
}
