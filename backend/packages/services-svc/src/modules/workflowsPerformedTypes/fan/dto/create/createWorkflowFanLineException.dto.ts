import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

const required = { required: true }
export class CreateWorkflowFanLineExceptionDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  code: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  description: string
}
