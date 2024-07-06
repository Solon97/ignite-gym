import { PrismaGymsRepository } from '@gyms/repositories/prisma-repository'
import { CheckInService } from '../check-in'
import { PrismaCheckInsRepository } from '@check-ins/repositories/prisma-repository'
import { PrismaUsersRepository } from '@users/repositories/prisma-repository'

export function makeCheckInService() {
  return new CheckInService(
    new PrismaCheckInsRepository(),
    new PrismaUsersRepository(),
    new PrismaGymsRepository(),
  )
}
