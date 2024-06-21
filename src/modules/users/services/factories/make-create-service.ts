import { PrismaUsersRepository } from '@users/repositories/prisma-repository'
import { CreateUserService } from '../create'

export function makeCreateService() {
  return new CreateUserService(new PrismaUsersRepository())
}
