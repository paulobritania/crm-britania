import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { DatabaseProvider } from '../../database/database.provider'
import { HierarchyModule } from '../hierarchy/hierarchy.module'
import { WorkflowFan } from '../workflowsPerformedTypes/fan/entities/workflowFan.entity'
import { WorkflowFanModule } from '../workflowsPerformedTypes/fan/fan.module'
import { FanController } from './fan.controller'
import { FanService } from './fan.service'

@Module({
  imports: [
    WorkflowFanModule,
    SequelizeModule.forFeature([WorkflowFan]),
    HierarchyModule
  ],
  controllers: [FanController],
  providers: [DatabaseProvider, FanService],
  exports: [FanService]
})
export class FanModule {}
