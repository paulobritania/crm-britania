import { Module } from '@nestjs/common'

import { ClientRankingModule } from './clientRankings/clientRankings.module'
import { ClientUpdateModule } from './clientUpdate/clientUpdate.module'
import { WorkflowFanModule } from './fan/fan.module'
import { RepresentativeRegistrationModule } from './representativeRegistration/representativeRegistration.module'

@Module({
  imports: [
    ClientRankingModule,
    ClientUpdateModule,
    RepresentativeRegistrationModule,
    WorkflowFanModule
  ]
})
export class WorkflowPerformedTypesModule {}
