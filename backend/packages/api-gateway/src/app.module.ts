import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from './database/database.module';
import { ProxyAuthenticationMiddleware } from './middlewares/proxy-authentication.middleware';
import { ProxyServicesMiddleware } from './middlewares/proxy-services.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: true,
      },
    }),
    DatabaseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProxyServicesMiddleware).forRoutes('services');
    consumer.apply(ProxyAuthenticationMiddleware).forRoutes('auth');
  }
}
