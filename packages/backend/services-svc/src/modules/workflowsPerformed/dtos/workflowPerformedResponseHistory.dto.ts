import { ApiProperty } from '@nestjs/swagger'

export class WorkflowPerformedResponseHistoryDto {
  @ApiProperty()
  workflowVersion: string

  @ApiProperty()
  taskTitle: string

  @ApiProperty()
  responseTitle: string

  @ApiProperty()
  responder: string

  @ApiProperty()
  justification: string

  @ApiProperty()
  respondedAt: string
}
