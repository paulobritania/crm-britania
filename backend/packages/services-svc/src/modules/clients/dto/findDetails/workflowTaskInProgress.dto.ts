/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

class WorkflowTaskResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  requiresJustification: boolean
}

export class WorkflowTaskInProgressDto {
  @ApiProperty()
  version: string

  @ApiProperty()
  task: string

  @ApiProperty({ type: WorkflowTaskResponseDto, isArray: true })
  responses: WorkflowTaskResponseDto[]

  @ApiProperty()
  isReadOnly: boolean
}
