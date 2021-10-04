import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { FinancialController } from './financial.controller'
import { FinancialService } from './financial.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot()
  ],
  controllers: [FinancialController],
  providers: [
    DatabaseProvider,
    FinancialService,
    {
      provide: 'LOGS_SERVICE',
      inject: [ConfigService],
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.LOG_HOST,
            port: Number(process.env.LOG_PORT)
          }
        })
    }
  ]
})
export class FinancialModule {}
