import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseModule } from './database/database.module'
import { LogsModule } from './logger/logs.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: true
      }
    }),
    DatabaseModule,
    LogsModule
  ]
})

export class AppModule {}
