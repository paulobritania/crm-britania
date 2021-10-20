import { ApiProperty } from '@nestjs/swagger'

import { WorkflowTaskConditionFieldAccessDto } from './workflowTaskConditionFieldAccess.dto'

export class WorkflowTaskConditionFieldDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  alias: string

  @ApiProperty()
  access: WorkflowTaskConditionFieldAccessDto
}
