import { makeCreateGymService } from '@gyms/services/factories/make-create-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createGym(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    phone: z.string().min(8).nullable(),
    latitude: z.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.number().refine((value) => Math.abs(value) <= 180),
  })
  const { name, description, phone, latitude, longitude } =
    createBodySchema.parse(request.body)
  const createService = makeCreateGymService()

  await createService.execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
