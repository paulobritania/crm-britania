import { ApiProperty } from '@nestjs/swagger'

export class WorkflowTypeDto {
  @ApiProperty()
  code: string

  @ApiProperty()
  description: string
}
