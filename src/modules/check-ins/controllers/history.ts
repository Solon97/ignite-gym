import { makeGetUserCheckInsHistoryService } from '@check-ins/services/factories/make-get-user-check-ins-history'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = querySchema.parse(request.query)
  const service = makeGetUserCheckInsHistoryService()
  const { checkIns } = await service.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    check_ins: checkIns,
  })
}
