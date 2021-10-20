import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

import { ClientsModule } from '../clients/clients.module'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    ClientsModule
  ],
  controllers: [ReportsController],
  providers: [
    ReportsService
  ]
})
export class ReportsModule {}
