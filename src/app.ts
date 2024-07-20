import fastifyJwt from '@fastify/jwt'
import { authRoutes, userRoutes } from '@users/controllers/routes'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { appEnv } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: appEnv.JWT_SECRET,
})

app.register(userRoutes)
app.register(authRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (appEnv.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Usar ferramenta externa (Datadog, NewRelic, Sentry, Grafana / Prometheus)
  }

  console.error(error)

  return reply.status(500).send({ message: 'internal server error' })
})
