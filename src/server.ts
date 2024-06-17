import { app } from './app'
import { env } from './env'

const port = 3333

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server Running in port ${port}!`)
  })
