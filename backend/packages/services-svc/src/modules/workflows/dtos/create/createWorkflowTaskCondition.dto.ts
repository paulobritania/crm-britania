import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

const required = { required: true }

export class CreateWorkflowTaskConditionDto {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  @ApiProperty(required)
  title: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  order: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  fieldId: number

  @IsString()
  @Length(1, 10)
  @IsNotEmpty()
  @ApiProperty(required)
  comparisonSymbol: string

  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  @ApiProperty(required)
  comparisonValue: string
}
