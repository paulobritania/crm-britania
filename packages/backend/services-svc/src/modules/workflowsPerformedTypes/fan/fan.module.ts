import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { DatabaseProvider } from '../../../database/database.provider'
import { BuyersModule } from '../../buyers/buyers.module'
import { File } from '../../files/entities/file.entity'
import { FilesModule } from '../../files/files.module'
import { Hierarchy } from '../../hierarchy/entities/hierarchy.entity'
import { LinesModule } from '../../lines/lines.module'
import { WorkflowPerformedModule } from '../../workflowsPerformed/workflowPerformed.module'
import { WorkflowFan } from './entities/workflowFan.entity'
import { WorkflowFanDocument } from './entities/workflowFanDocument.entity'
import { WorkflowFanFamily } from './entities/workflowFanFamily.entity'
import { WorkflowFanFamilyException } from './entities/workflowFanFamilyException.entity'
import { WorkflowFanGoalAchivement } from './entities/workflowFanGoalAchivement.entity'
import { WorkflowFanLine } from './entities/workflowFanLine.entity'
import { WorkflowFanLineException } from './entities/workflowFanLineException.entity'
import { WorkflowFanNegotiatedFund } from './entities/workflowFanNegotiatedFund.entity'
import { WorkflowFanPercentage } from './entities/workflowFanPercentage.entity'
import { WorkflowFanPerformed } from './entities/workflowFanPerformed.entity'
import { WorkflowFanService } from './fan.service'
@Module({
  imports: [
    SequelizeModule.forFeature([
      WorkflowFan,
      WorkflowFanNegotiatedFund,
      WorkflowFanPercentage,
      WorkflowFanGoalAchivement,
      WorkflowFanPerformed,
      WorkflowFanDocument,
      WorkflowFanLine,
      WorkflowFanFamily,
      WorkflowFanLineException,
      WorkflowFanFamilyException,
      File,
      Hierarchy
    ]),
    WorkflowPerformedModule,
    FilesModule,
    LinesModule,
    BuyersModule
  ],
  providers: [DatabaseProvider, WorkflowFanService],
  exports: [WorkflowFanService]
})
export class WorkflowFanModule {}
