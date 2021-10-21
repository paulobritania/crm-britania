import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

const required = { required: true }

export class CreateWorkflowFanFamilyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  code: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  description: string
}
