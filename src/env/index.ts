import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  DEFAULT_PER_PAGE: z.coerce.number().default(20),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
})

export const appEnv = envSchema.parse(process.env)
