import { ApiProperty } from '@nestjs/swagger'

export class WorkflowHistoryDto {
  @ApiProperty()
  updatedBy: string

  @ApiProperty()
  updatedAt: string

  @ApiProperty()
  version: string

  @ApiProperty()
  updatedFields: string
}
