import { makeValidateCheckInService } from '@check-ins/services/factories/make-validate-check-in'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = paramsSchema.parse(request.params)

  const checkinService = makeValidateCheckInService()

  await checkinService.execute({
    checkInId,
    userId: request.user.sub,
  })

  return reply.status(204).send()
}
