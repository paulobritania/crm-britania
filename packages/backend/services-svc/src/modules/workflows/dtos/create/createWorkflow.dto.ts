import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Validate,
  ValidateNested
} from 'class-validator'

import { IsBeforeOrEqualThan } from '../../../../utils/validations/isBeforeOrEqualThanValidator'
import { IsCurrentOrFutureDate } from '../../../../utils/validations/isCurrentOrFutureDateValidator'
import { CreateWorkflowTaskDto } from './createWorkflowTask.dto'

const required = { required: true }

export class CreateWorkflowDto {
  @IsString()
  @Length(1, 80)
  @IsNotEmpty()
  @ApiProperty(required)
  title: string

  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  @ApiProperty(required)
  description: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  typeId: number

  @IsDateString()
  @Validate(IsBeforeOrEqualThan, ['dateEnd'])
  @Validate(IsCurrentOrFutureDate)
  @ApiProperty(required)
  dateStart: string

  @IsDateString()
  @ApiProperty(required)
  dateEnd: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowTaskDto)
  @ArrayMinSize(1)
  @ApiProperty({ ...required, type: CreateWorkflowTaskDto, isArray: true })
  tasks: CreateWorkflowTaskDto[]
}
