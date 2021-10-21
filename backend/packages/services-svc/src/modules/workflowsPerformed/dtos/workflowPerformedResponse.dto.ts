import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class WorkflowPerformedResponseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  workflowTaskResponseId: number

  @IsString()
  @IsOptional()
  @Length(1, 100)
  @ApiProperty({ required: false })
  justification: string
}
