import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  IsBoolean,
  Validate
} from 'class-validator'

import { IsNotConjunction } from '../../../../utils/validations/isNotConjuntionValidator'

const required = { required: true }

export class CreateWorkflowTaskResponseDto {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  @ApiProperty(required)
  title: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  order: number

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty(required)
  requiresJustification: boolean

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  nextTaskOrder?: number

  @IsBoolean()
  @IsNotEmpty()
  @Validate(IsNotConjunction, ['finishWorkflowWithError'])
  @ApiProperty(required)
  finishWorkflowSuccessfully: boolean

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty(required)
  finishWorkflowWithError: boolean
}
