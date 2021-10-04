import { ApiProperty } from '@nestjs/swagger'

import { WorkflowStatusEnum } from '../../enum/workflowStatus.enum'

export class ListWorkflowDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  type: string

  @ApiProperty()
  version: string

  @ApiProperty()
  dateStart: string

  @ApiProperty()
  dateEnd: string

  @ApiProperty({ enum: WorkflowStatusEnum })
  status: WorkflowStatusEnum
}
