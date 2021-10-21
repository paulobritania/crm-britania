import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Validate,
  ValidateNested
} from 'class-validator'

import { IsRequiredWhenAnotherFieldIsProvided } from '../../../../utils/validations/isRequiredWhenAnotherFieldIsProvidedValidator'
import { CreateWorkflowTaskConditionDto } from './createWorkflowTaskCondition.dto'
import { CreateWorkflowTaskResponseDto } from './createWorkflowTaskResponse.dto'

const required = { required: true }
export class CreateWorkflowTaskDto {
  @IsString()
  @Length(1, 80)
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
  profileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  userId?: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  userAlternateId: number

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  allowApproverFromHierarchy: boolean

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Validate(IsRequiredWhenAnotherFieldIsProvided, ['allowApproverFromHierarchy'])
  hierarchyLevel?: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty(required)
  deadline: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowTaskConditionDto)
  @ApiProperty({
    ...required,
    type: CreateWorkflowTaskConditionDto,
    isArray: true
  })
  conditions: CreateWorkflowTaskConditionDto[]

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowTaskResponseDto)
  @ApiProperty({
    ...required,
    type: CreateWorkflowTaskResponseDto,
    isArray: true
  })
  responses: CreateWorkflowTaskResponseDto[]
}
