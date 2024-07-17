import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileService } from '@auth/services/factories/make-get-user-profile-service'
import { UserNotFoundError } from '@users/errors/not-found'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const userId = request.user.sub

  const getUserProfileService = makeGetUserProfileService()

  const { user } = await getUserProfileService
    .execute({ userId })
    .catch((error) => {
      if (error instanceof UserNotFoundError) {
        return reply.status(404).send({ error: error.message })
      }
      throw error
    })

  return reply.status(200).send({ user })
}
