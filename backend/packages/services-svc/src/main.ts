import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { translateErrors } from './utils/translators/errors'

const logger = new Logger()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({ origin: '*' })
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: translateErrors
    })
  )

  const options = new DocumentBuilder()
    .setTitle('Britânia CRM API - API Documentation')
    .setDescription('Services Microservice')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header'
    })
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  const port = process.env.PORT || 3000
  await app.listen(port, () =>
    logger.log(`Microservice Services listening on port ${ port }`)
  )
}

bootstrap()
