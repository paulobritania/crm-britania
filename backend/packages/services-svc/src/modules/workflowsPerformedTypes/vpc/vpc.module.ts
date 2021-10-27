import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../../database/database.provider'
import { File } from '../../files/entities/file.entity'
import { FilesModule } from '../../files/files.module'
import { WorkflowPerformed } from '../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedModule } from '../../workflowsPerformed/workflowPerformed.module'
import { WorkflowVpc } from './entities/workflowVpc.entity'
import { WorkflowVpcAttachment } from './entities/workflowVpcAttachments.entity'
import { WorkflowVpcLineFamily } from './entities/workflowVpcLineFamily.entity'
import { WorkflowVpcNd } from './entities/workflowVpcNd.entity'
import { WorkflowVpcPerformed } from './entities/workflowVpcPerformed.entity'
import { WorkflowVpcProduct } from './entities/workflowVpcProduct.entity'
import { WorkflowVpcRequest } from './entities/workflowVpcRequests.entity'
import { WorkflowVpcStatus } from './entities/workflowVpcStatus.entity'
import { WorkflowVpcService } from './vpc.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      WorkflowVpcAttachment,
      WorkflowVpc,
      WorkflowVpcLineFamily,
      WorkflowVpcNd,
      WorkflowVpcProduct,
      WorkflowVpcRequest,
      WorkflowPerformed,
      WorkflowVpcPerformed,
      File,
      WorkflowVpcStatus
    ]),
    WorkflowPerformedModule,
    FilesModule
  ],
  providers: [
    DatabaseProvider,
    WorkflowVpcService,
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
  exports: [WorkflowVpcService]
})
export class OpenVpcModule {}
