import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

const required = { required: true }

export class CreateWorkflowVpcLineFamilyDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  lineCode: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  lineDescription: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  familyCode: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  familyDescription: string
}
