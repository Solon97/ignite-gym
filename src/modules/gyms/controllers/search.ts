import { makeSearchGymsService } from '@gyms/services/factories/make-search-gyms-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchGyms(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchQuerySchema.parse(request.query)
  const searchService = makeSearchGymsService()

  const { gyms } = await searchService.execute({
    query,
    page,
  })

  return reply.status(200).send({
    gyms,
  })
}
