import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { Workflow } from './entities/workflow.entity'
import { WorkflowHistory } from './entities/workflowHistory.entity'
import { WorkflowTask } from './entities/workflowTask.entity'
import { WorkflowTaskCondition } from './entities/workflowTaskCondition.entity'
import { WorkflowTaskResponse } from './entities/workflowTaskResponse.entity'
import { WorkflowType } from './entities/workflowType.entity'
import { WorkflowTypeAccess } from './entities/workflowTypesAccess.entity'
import { WorkflowsController } from './workflows.controller'
import { WorkflowsService } from './workflows.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      Workflow,
      WorkflowTask,
      WorkflowTaskCondition,
      WorkflowTaskResponse,
      WorkflowType,
      WorkflowTypeAccess,
      WorkflowHistory,
      Hierarchy
    ])
  ],
  providers: [
    WorkflowsService,
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
  controllers: [WorkflowsController],
  exports: [WorkflowsService]
})
export class WorkflowsModule {}
