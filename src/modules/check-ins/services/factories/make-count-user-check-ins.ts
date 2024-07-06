import { PrismaCheckInsRepository } from '@check-ins/repositories/prisma-repository'
import { PrismaUsersRepository } from '@users/repositories/prisma-repository'
import { CountUserCheckInsService } from '../count-user-check-ins'

export function makeCountUserCheckInsService() {
  return new CountUserCheckInsService(
    new PrismaCheckInsRepository(),
    new PrismaUsersRepository(),
  )
}
