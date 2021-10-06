import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

const required = { required: true }

export class CreateWorkflowFanLineDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  code: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  description: string
}
