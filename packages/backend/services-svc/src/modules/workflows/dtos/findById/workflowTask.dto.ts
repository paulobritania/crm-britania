import { ApiProperty } from '@nestjs/swagger'

import { WorkflowTaskConditionDto } from './workflowTaskCondition.dto'
import { WorkflowTaskProfileDto } from './workflowTaskProfile.dto'
import { WorkflowTaskResponseDto } from './workflowTaskResponse.dto'
import { WorkflowTaskUserDto } from './workflowTaskUser.dto'

export class WorkflowTaskDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  order: number

  @ApiProperty()
  profile: WorkflowTaskProfileDto

  @ApiProperty()
  user: WorkflowTaskUserDto

  @ApiProperty()
  userAlternate: WorkflowTaskUserDto

  @ApiProperty()
  deadline: number

  @ApiProperty({
    type: WorkflowTaskConditionDto,
    isArray: true
  })
  conditions: WorkflowTaskConditionDto[]

  @ApiProperty({
    type: WorkflowTaskResponseDto,
    isArray: true
  })
  responses: WorkflowTaskResponseDto[]
}
