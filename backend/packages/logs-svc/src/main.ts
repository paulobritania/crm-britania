import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'

import { AppModule } from './app.module'

async function bootstrap() {

  // Adiciona TCP
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.URL,
      port: Number(process.env.PORT)
    }
  })
  // eslint-disable-next-line no-console
  await app.listen(() => console.log('Microservice listening on port:', Number(process.env.PORT)))

  // Adiciona http
  const http = await NestFactory.create(AppModule)
  await http.listen(Number(process.env.HTTP_PORT))
  // eslint-disable-next-line no-console
  console.log(`Http listening on ${ Number(process.env.HTTP_PORT) }`)

}

bootstrap()
