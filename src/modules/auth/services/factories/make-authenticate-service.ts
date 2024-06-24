import { PrismaUsersRepository } from '@users/repositories/prisma-repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  return new AuthenticateService(new PrismaUsersRepository())
}
