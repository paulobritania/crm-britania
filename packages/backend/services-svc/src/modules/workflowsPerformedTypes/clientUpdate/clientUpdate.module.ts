import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../../database/database.provider'
import { WorkflowPerformedModule } from '../../workflowsPerformed/workflowPerformed.module'
import { WorkflowClientUpdateService } from './clientUpdate.service'
import { WorkflowClientUpdate } from './entities/workflowClientUpdate.entity'
import { WorkflowClientUpdateAddress } from './entities/workflowClientUpdateAddress.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      WorkflowClientUpdate,
      WorkflowClientUpdateAddress
    ]),
    WorkflowPerformedModule
  ],
  providers: [
    WorkflowClientUpdateService,
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
  exports: [WorkflowClientUpdateService]
})
export class ClientUpdateModule {}
