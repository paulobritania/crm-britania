import { ApiProperty } from '@nestjs/swagger'

import { WorkflowTaskConditionFieldDto } from './workflowTaskConditionField.dto'

export class WorkflowTaskConditionDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  order: number

  @ApiProperty()
  field: WorkflowTaskConditionFieldDto

  @ApiProperty()
  comparisonSymbol: string

  @ApiProperty()
  comparisonValue: string
}
