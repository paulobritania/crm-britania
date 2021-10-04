import { Module } from '@nestjs/common'

import { DatabaseProvider } from '../database/database.provider'
import { WorkflowsModule } from '../modules/workflows/workflows.module'
import { WorkflowsCron } from './workflows/workflows.cron'

@Module({
  imports: [WorkflowsModule],
  providers: [WorkflowsCron, DatabaseProvider]
})
export class CronsModule {}
