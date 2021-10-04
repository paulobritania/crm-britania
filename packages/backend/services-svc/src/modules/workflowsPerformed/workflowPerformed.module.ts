import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { WorkflowsModule } from '../workflows/workflows.module'
import { WorkflowPerformedResponse } from './entities/workflowPerformedResponses.entity'
import { WorkflowPerformed } from './entities/workflowsPerformed.entity'
import { WorkflowPerformedService } from './workflowPerformed.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([WorkflowPerformedResponse, WorkflowPerformed, Hierarchy]),
    WorkflowsModule
  ],
  providers: [
    WorkflowPerformedService,
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
  exports: [WorkflowPerformedService]
})
export class WorkflowPerformedModule {}
