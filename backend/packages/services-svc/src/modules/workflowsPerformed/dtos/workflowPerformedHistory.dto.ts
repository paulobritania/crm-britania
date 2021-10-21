import { ApiProperty } from '@nestjs/swagger'

import { WorkflowPerformedResponseHistoryDto } from './workflowPerformedResponseHistory.dto'

export class WorkflowPerformedHistoryDto {
  @ApiProperty()
  workflowPerformedId: number

  @ApiProperty()
  requester: string

  @ApiProperty()
  requestedAt: string

  @ApiProperty()
  lastResponseDescription: string

  @ApiProperty()
  lastResponseResponder: string

  @ApiProperty()
  workflowVersion: string

  @ApiProperty()
  workflowType: string

  @ApiProperty()
  workflowPerformedResponseHistory?: WorkflowPerformedResponseHistoryDto[]
}
