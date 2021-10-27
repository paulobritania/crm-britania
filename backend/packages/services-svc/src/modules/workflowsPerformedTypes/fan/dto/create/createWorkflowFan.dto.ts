import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsString,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsArray,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsNotEmpty
} from 'class-validator'

import { CompanyEnum } from '../../enum/company.enum'
import { CreateWorkflowFanFamilyDto } from './createWorkflowFanFamily.dto'
import { CreateWorkflowFanFamilyExceptionDto } from './createWorkflowFanFamilyException.dto'
import { CreateWorkflowFanGoalAchivementDto } from './createWorkflowFanGoalAchivement.dto'
import { CreateWorkflowFanLineDto } from './createWorkflowFanLine.dto'
import { CreateWorkflowFanLineExceptionDto } from './createWorkflowFanLineException.dto'
import { CreateWorkflowFanNegotiatedFundDto } from './createWorkflowFanNegotiatedFund.dto'
import { CreateWorkflowFanPercentageDto } from './createWorkflowFanPercentage.dto'

export class CreateWorkflowFanDto {
  @IsEnum(CompanyEnum)
  @ApiProperty({ enum: CompanyEnum })
  @IsOptional()
  company: string

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  parentCompanyCode: number

  @IsString()
  @ApiProperty()
  @IsOptional()
  parentCompanyName: string

  @IsString()
  @ApiProperty()
  @IsOptional()
  responsible: string

  @IsString()
  @ApiProperty()
  @IsOptional()
  regionalManager: string

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  regionalManagerCode: number

  @IsDateString()
  @ApiProperty()
  @IsOptional()
  startDate: Date

  @IsDateString()
  @ApiProperty()
  @IsOptional()
  endDate: Date

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  directorship: number

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  directorshipDescription: string

  @IsString()
  @ApiProperty()
  @IsOptional()
  observation: string

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  active: boolean

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  isAdditive: boolean

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  workflowFanId?: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowFanLineDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowFanLineDto,
    isArray: true
  })
  lines: CreateWorkflowFanLineDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowFanFamilyDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowFanFamilyDto,
    isArray: true
  })
  families: CreateWorkflowFanFamilyDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowFanFamilyExceptionDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowFanFamilyExceptionDto,
    isArray: true
  })
  familiesExceptions: CreateWorkflowFanFamilyExceptionDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowFanLineExceptionDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowFanLineExceptionDto,
    isArray: true
  })
  linesExceptions: CreateWorkflowFanLineExceptionDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowFanPercentageDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowFanPercentageDto,
    isArray: true
  })
  percentages: CreateWorkflowFanPercentageDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowFanNegotiatedFundDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowFanNegotiatedFundDto,
    isArray: true
  })
  negotiatedFunds: CreateWorkflowFanNegotiatedFundDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowFanGoalAchivementDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowFanGoalAchivementDto,
    isArray: true
  })
  achivements: CreateWorkflowFanGoalAchivementDto[]
}
