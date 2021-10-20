import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, ValidateNested } from 'class-validator'

import { CreateWorkflowFanDto } from '../create/createWorkflowFan.dto'
import { UpdateWorkflowFanFamilyDto } from './updateWorkflowFanFamily.dto'
import { UpdateWorkflowFanFamilyExceptionDto } from './updateWorkflowFanFamilyException.dto'
import { UpdateWorkflowFanGoalAchivementDto } from './updateWorkflowFanGoalAchivement.dto'
import { UpdateWorkflowFanLineDto } from './updateWorkflowFanLine.dto'
import { UpdateWorkflowFanLineExceptionDto } from './updateWorkflowFanLineException.dto'
import { UpdateWorkflowFanNegotiatedFundDto } from './updateWorkflowFanNegotiatedFund.dto'
import { UpdatereateWorkflowFanPercentageDto } from './updateWorkflowFanPercentage.dto'

export class UpdateWorkflowFanDto extends CreateWorkflowFanDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkflowFanLineDto)
  @ApiProperty({
    required: false,
    type: UpdateWorkflowFanLineDto,
    isArray: true
  })
  lines: UpdateWorkflowFanLineDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkflowFanFamilyDto)
  @ApiProperty({
    required: false,
    type: UpdateWorkflowFanFamilyDto,
    isArray: true
  })
  families: UpdateWorkflowFanFamilyDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkflowFanFamilyExceptionDto)
  @ApiProperty({
    required: false,
    type: UpdateWorkflowFanFamilyExceptionDto,
    isArray: true
  })
  familiesExceptions: UpdateWorkflowFanFamilyExceptionDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkflowFanLineExceptionDto)
  @ApiProperty({
    required: false,
    type: UpdateWorkflowFanLineExceptionDto,
    isArray: true
  })
  linesExceptions: UpdateWorkflowFanLineExceptionDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatereateWorkflowFanPercentageDto)
  @ApiProperty({
    required: false,
    type: UpdatereateWorkflowFanPercentageDto,
    isArray: true
  })
  percentages: UpdatereateWorkflowFanPercentageDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkflowFanNegotiatedFundDto)
  @ApiProperty({
    required: false,
    type: UpdateWorkflowFanNegotiatedFundDto,
    isArray: true
  })
  negotiatedFunds: UpdateWorkflowFanNegotiatedFundDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkflowFanGoalAchivementDto)
  @ApiProperty({
    required: false,
    type: UpdateWorkflowFanGoalAchivementDto,
    isArray: true
  })
  achivements: UpdateWorkflowFanGoalAchivementDto[]
}
