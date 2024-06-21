import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../repositories/prisma-repository'
import { CreateUserService } from '../services/create'
import { UserAlreadyExistsError } from '../services/errors/already-exists'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const bodyData = createBodySchema.parse(request.body)
  const service = new CreateUserService(new PrismaUsersRepository())
  service
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
