import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateService } from '../services/factories/make-authenticate-service'
import { InvalidCredentialsError } from '../services/errors/invalid-credentials'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const bodyData = authenticateBodySchema.parse(request.body)
  const authenticateService = makeAuthenticateService()
  await authenticateService.execute(bodyData).catch((error) => {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ error: error.message })
    }
    throw error
  })
  return reply.status(200).send()
}
