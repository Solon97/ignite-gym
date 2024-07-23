import { makeCountUserCheckInsService } from '@check-ins/services/factories/make-count-user-check-ins'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const service = makeCountUserCheckInsService()

  const { checkInsCount } = await service.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    check_ins_count: checkInsCount,
  })
}
