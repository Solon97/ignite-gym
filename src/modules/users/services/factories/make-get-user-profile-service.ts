import { PrismaUsersRepository } from '@users/repositories/prisma-repository'
import { GetUserProfileService } from '../get-user-profile'

export function makeGetUserProfileService() {
  return new GetUserProfileService(new PrismaUsersRepository())
}
