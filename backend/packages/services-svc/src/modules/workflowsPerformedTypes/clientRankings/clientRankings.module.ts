import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../../database/database.provider'
import { WorkflowPerformedModule } from '../../workflowsPerformed/workflowPerformed.module'
import { WorkflowClientRankingService } from './clientRankings.service'
import { WorkflowClientRanking } from './entities/workflowClientRanking.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([WorkflowClientRanking]),
    WorkflowPerformedModule
  ],
  providers: [
    WorkflowClientRankingService,
    DatabaseProvider,
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
  ],
  controllers: [],
  exports: [WorkflowClientRankingService]
})
export class ClientRankingModule {}
