import { appEnv } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: appEnv.NODE_ENV === 'dev' ? ['query'] : ['error'],
})
