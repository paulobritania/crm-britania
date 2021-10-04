import { ApiProperty } from '@nestjs/swagger'

import { WorkflowStatusEnum } from '../../enum/workflowStatus.enum'
import { WorkflowHistoryDto } from './workflowHistory.dto'
import { WorkflowTaskDto } from './workflowTask.dto'

export class WorkflowDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  type: string

  @ApiProperty()
  dateStart: string

  @ApiProperty()
  dateEnd: string

  @ApiProperty()
  version: string

  @ApiProperty()
  lastUpdateLogin: string

  @ApiProperty()
  lastUpdateDate: string

  @ApiProperty()
  active: boolean

  @ApiProperty({
    type: WorkflowTaskDto,
    isArray: true
  })
  tasks: WorkflowTaskDto[]

  @ApiProperty()
  histories: WorkflowHistoryDto[]

  @ApiProperty({ enum: WorkflowStatusEnum })
  status: WorkflowStatusEnum
}
