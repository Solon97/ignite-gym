import { makeGetNearbyGymsService } from '@gyms/services/factories/make-get-nearby-gyms-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

// ? distancia em metros, que um usuário pode estar da academia
const distanceInMeters = 100

export async function getNearbyGyms(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const nearbyGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })

  const { latitude, longitude, page } = nearbyGymsQuerySchema.parse(
    request.query,
  )
  const nearbyService = makeGetNearbyGymsService()

  const { gyms } = await nearbyService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    distanceInMeters,
    page,
  })

  return reply.status(200).send({ gyms })
}
