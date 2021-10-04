import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

const logger = new Logger()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder()
    .setTitle('Britânia CRM API - API Documentation')
    .setDescription('Authentication Microservice')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  const port = process.env.PORT || 3000
  await app.listen(port, () => logger.log(`Microservice Authentication listening on port ${ port }`))
}


bootstrap()
