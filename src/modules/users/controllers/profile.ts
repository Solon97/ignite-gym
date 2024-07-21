import { UserNotFoundError } from '@users/errors/not-found'
import { makeGetUserProfileService } from '@users/services/factories/make-get-user-profile-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
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
