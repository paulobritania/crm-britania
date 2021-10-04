import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { ClientRankingsModule } from '../clientRankings/clientRankings.module'
import { ClientRanking } from '../clientRankings/entities/clientRanking.entity'
import { ClientRankingIndicator } from '../clientRankings/entities/clientRankingIndicator.entity'
import { HierarchyModule } from '../hierarchy/hierarchy.module'
import { WorkflowPerformed } from '../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedModule } from '../workflowsPerformed/workflowPerformed.module'
import { ClientRankingModule } from '../workflowsPerformedTypes/clientRankings/clientRankings.module'
import { ClientRegisterModule } from '../workflowsPerformedTypes/clientRegister/clientRegister.module'
import { ClientUpdateModule } from '../workflowsPerformedTypes/clientUpdate/clientUpdate.module'
import { ClientsController } from './clients.controller'
import { ClientsService } from './clients.service'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      ClientRanking,
      ClientRankingIndicator,
      WorkflowPerformed
    ]),
    ClientUpdateModule,
    ClientRegisterModule,
    ClientRankingModule,
    ClientRankingsModule,
    WorkflowPerformedModule,
    HierarchyModule
  ],
  controllers: [ClientsController],
  exports: [ClientsService],
  providers: [
    DatabaseProvider,
    ClientsService,
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
export class ClientsModule {}
