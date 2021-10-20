import { ApiProperty } from '@nestjs/swagger'

export class WorkflowTaskResponseDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  order: number

  @ApiProperty()
  requiresJustification: boolean

  @ApiProperty()
  nextTaskOrder?: number

  @ApiProperty()
  finishWorkflowSuccessfully: boolean

  @ApiProperty()
  finishWorkflowWithError: boolean
}
