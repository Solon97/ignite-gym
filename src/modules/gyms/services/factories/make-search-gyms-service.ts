import { PrismaGymsRepository } from '@gyms/repositories/prisma-repository'
import { SearchGymsService } from '../search-gyms'

export function makeSearchGymsService() {
  return new SearchGymsService(new PrismaGymsRepository())
}
