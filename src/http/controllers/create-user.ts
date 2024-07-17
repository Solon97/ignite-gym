import { UserAlreadyExistsError } from '@users/errors/already-exists'
import { makeCreateUserService } from '@users/services/factories/make-create-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const bodyData = createBodySchema.parse(request.body)
  const createService = makeCreateUserService()
  createService
    .execute(bodyData)
    .then(() => {
      return reply.status(201).send()
    })
    .catch((error) => {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ error: error.message })
      }
      throw error
    })
}
