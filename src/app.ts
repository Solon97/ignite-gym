import fastify from 'fastify'
import { userRoutes } from './modules/users/routes'

export const app = fastify()

app.register(userRoutes)
