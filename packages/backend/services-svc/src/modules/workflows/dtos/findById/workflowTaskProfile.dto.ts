import { ApiProperty } from '@nestjs/swagger'

export class WorkflowTaskProfileDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string
}
