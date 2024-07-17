import { PrismaUsersRepository } from '@users/repositories/prisma-repository'
import { CreateUserService } from '../create'

export function makeCreateUserService() {
  return new CreateUserService(new PrismaUsersRepository())
}
