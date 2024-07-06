import { PrismaGymsRepository } from '@gyms/repositories/prisma-repository'
import { GetNearbyGymsService } from '../get-nearby-gyms'

export function makeGetNearbyGymsService() {
  return new GetNearbyGymsService(new PrismaGymsRepository())
}
