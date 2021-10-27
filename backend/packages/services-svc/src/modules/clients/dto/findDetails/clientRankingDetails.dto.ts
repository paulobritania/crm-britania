/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

import { RankingDto } from '../findAll/ranking.dto'
import { WorkflowTaskInProgressDto } from './workflowTaskInProgress.dto'

class ClientRankingIndicatorDto {
  @ApiProperty()
  growth: number

  @ApiProperty()
  devolution: number

  @ApiProperty()
  productIntroduction: number

  @ApiProperty()
  paymentTerms: number
}

class ClientRankingWorkflowInProgressDto {
  @ApiProperty()
  requester: string

  @ApiProperty()
  date: string

  @ApiProperty()
  requestedRanking: RankingDto

  @ApiProperty()
  justification: string
}

export class ClientRankingDetailsDto {
  @ApiProperty()
  currentRanking: RankingDto

  @ApiProperty()
  oldRanking: RankingDto

  @ApiProperty({ type: ClientRankingIndicatorDto })
  indicators: ClientRankingIndicatorDto

  @ApiProperty({ type: ClientRankingWorkflowInProgressDto })
  workflowInProgress: ClientRankingWorkflowInProgressDto

  @ApiProperty({ type: ClientRankingWorkflowInProgressDto })
  workflowTaskInProgress: WorkflowTaskInProgressDto
}
