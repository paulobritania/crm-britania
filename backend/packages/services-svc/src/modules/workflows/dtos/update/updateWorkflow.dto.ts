import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
  ValidateNested
} from 'class-validator'

import { IsBeforeOrEqualThan } from '../../../../utils/validations/isBeforeOrEqualThanValidator'
import { CreateWorkflowTaskDto } from '../create/createWorkflowTask.dto'
import { UpdateWorkflowTaskDto } from './updateWorkflowTask.dto'

const required = { required: true }

export class UpdateWorkflowDto {
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

  @IsDateString()
  @Validate(IsBeforeOrEqualThan, ['dateEnd'])
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
  tasks: UpdateWorkflowTaskDto[]
}
