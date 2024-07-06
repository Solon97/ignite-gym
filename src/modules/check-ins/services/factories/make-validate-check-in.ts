import { PrismaCheckInsRepository } from '@check-ins/repositories/prisma-repository'
import { PrismaUsersRepository } from '@users/repositories/prisma-repository'
import { ValidateCheckInService } from '../validate-check-in'

export function makeValidateCheckInService() {
  return new ValidateCheckInService(
    new PrismaCheckInsRepository(),
    new PrismaUsersRepository(),
  )
}
