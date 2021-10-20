import { ApiProperty } from '@nestjs/swagger'

export class WorkflowTaskConditionFieldAccessDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  alias: string
}
