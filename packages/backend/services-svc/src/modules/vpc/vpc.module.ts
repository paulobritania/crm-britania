import { Module, HttpModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { BuyersModule } from '../buyers/buyers.module'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { HierarchyModule } from '../hierarchy/hierarchy.module'
import { User } from '../users/entities/user.entity'
import { UserRepresentativeCode } from '../users/entities/userRepresentativeCode.entity'
import { Workflow } from '../workflows/entities/workflow.entity'
import { WorkflowTask } from '../workflows/entities/workflowTask.entity'
import { WorkflowType } from '../workflows/entities/workflowType.entity'
import { WorkflowsModule } from '../workflows/workflows.module'
import { WorkflowPerformedModule } from '../workflowsPerformed/workflowPerformed.module'
import { WorkflowVpc } from '../workflowsPerformedTypes/vpc/entities/workflowVpc.entity'
import { WorkflowVpcAttachment } from '../workflowsPerformedTypes/vpc/entities/workflowVpcAttachments.entity'
import { WorkflowVpcLineFamily } from '../workflowsPerformedTypes/vpc/entities/workflowVpcLineFamily.entity'
import { WorkflowVpcNd } from '../workflowsPerformedTypes/vpc/entities/workflowVpcNd.entity'
import { WorkflowVpcProduct } from '../workflowsPerformedTypes/vpc/entities/workflowVpcProduct.entity'
import { WorkflowVpcRequest } from '../workflowsPerformedTypes/vpc/entities/workflowVpcRequests.entity'
import { OpenVpcModule } from '../workflowsPerformedTypes/vpc/vpc.module'
import { VpcController } from './vpc.controller'
import { VpcService } from './vpc.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    HttpModule,
    SequelizeModule.forFeature([
      WorkflowVpc,
      WorkflowVpcAttachment,
      WorkflowVpcLineFamily,
      WorkflowVpcNd,
      WorkflowVpcProduct,
      WorkflowVpcRequest,
      Hierarchy,
      UserRepresentativeCode,
      User,
      Workflow,
      WorkflowTask,
      WorkflowType
    ]),
    OpenVpcModule,
    BuyersModule,
    WorkflowsModule,
    WorkflowPerformedModule,
    HierarchyModule
  ],
  controllers: [VpcController],
  providers: [
    DatabaseProvider,
    VpcService,
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
  exports: [VpcService]
})
export class VpcModule {}
