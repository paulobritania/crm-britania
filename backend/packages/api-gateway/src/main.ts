import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 9000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  debugger; // eslint-disable-line no-debugger
  await app.listen(port, () =>
    console.log(`API gateway listening on port ${port}`),
  );
}

bootstrap();
