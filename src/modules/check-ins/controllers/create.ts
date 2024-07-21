import { makeCheckInService } from '@check-ins/services/factories/make-check-in-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCheckIn(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const bodySchema = z.object({
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })

  const { gymId } = paramsSchema.parse(request.params)
  const { latitude, longitude } = bodySchema.parse(request.body)

  const checkinService = makeCheckInService()

  await checkinService.execute({
    userId: request.user.sub,
    gymId,
    userCoordinates: {
      latitude,
      longitude,
    },
  })

  return reply.status(201).send()
}
