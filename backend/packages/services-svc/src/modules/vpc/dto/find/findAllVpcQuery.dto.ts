import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsOptional,
  Validate,
  IsNumber,
  IsString,
  IsDateString,
  IsEnum
} from 'class-validator'

import { OrderedAndPagedQueryDto } from '../../../../utils/pagination/orderedQuery.dto'
import { IsStringifiedNumberArray } from '../../../../utils/validations/isStringifiedNumberArrayValidator'
import { FoundsSituationEnum } from '../../enum/foundsSituation.enum'
import { FoundsTypeEnum } from '../../enum/foundsType.enum'
import { PendingApprovalEnum } from '../../enum/pendingApproval.enum'
import { VpcOrderByEnum } from '../../enum/vpcOrderBy.enum'

const notRequired = { required: false }

export class FindAllVpcQueryDto extends OrderedAndPagedQueryDto<VpcOrderByEnum> {
  @IsOptional()
  @IsEnum(VpcOrderByEnum)
  @ApiProperty({ enum: VpcOrderByEnum, required: false })
  orderBy: VpcOrderByEnum

  @Validate(IsStringifiedNumberArray)
  @IsOptional()
  @ApiProperty(notRequired)
  ids: string

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  cnpj: string

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @ApiProperty(notRequired)
  parentCompanyCode: number

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  parentCompanyName: string

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  requestNumber: string

  @IsOptional()
  @IsEnum(FoundsTypeEnum)
  @ApiProperty({ enum: FoundsTypeEnum, required: false })
  foundsType: FoundsTypeEnum

  @IsOptional()
  @IsEnum(FoundsSituationEnum)
  @ApiProperty({ enum: FoundsSituationEnum, required: false })
  foundsSituation: FoundsSituationEnum

  @IsDateString()
  @IsOptional()
  @ApiProperty(notRequired)
  startDate: string

  @IsDateString()
  @ApiProperty(notRequired)
  @IsOptional()
  endDate: string

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @ApiProperty(notRequired)
  lineCode: number

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  lineDescription: string

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  approverCode: number

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty(notRequired)
  initialValue: number

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty(notRequired)
  finalValue: number

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty(notRequired)
  workflowId: number

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty(notRequired)
  workflowTaskId: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  responsible: string

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  sla: string

  @IsEnum(PendingApprovalEnum)
  @IsOptional()
  @ApiProperty({ enum: PendingApprovalEnum, required: false })
  pendingApproval: PendingApprovalEnum

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  q: string
}
