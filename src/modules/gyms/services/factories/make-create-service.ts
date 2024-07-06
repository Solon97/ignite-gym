import { PrismaGymsRepository } from '@gyms/repositories/prisma-repository'
import { CreateGymService } from '../create'

export function makeCreateGymService() {
  return new CreateGymService(new PrismaGymsRepository())
}
