import { PrismaCheckInsRepository } from '@check-ins/repositories/prisma-repository'
import { PrismaUsersRepository } from '@users/repositories/prisma-repository'
import { GetUserCheckInsHistoryService } from '../get-user-check-ins-history'

export function makeGetUserCheckInsHistoryService() {
  return new GetUserCheckInsHistoryService(
    new PrismaCheckInsRepository(),
    new PrismaUsersRepository(),
  )
}
