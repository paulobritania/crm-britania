import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator'

import { OrderedAndPagedQueryDto } from '../../../utils/pagination/orderedQuery.dto'
import { CompositionReportEnum } from '../enum/compositionReport.enum'
import { FinancialSecuritiesOrderByOptionsEnum } from '../enum/financialSecuritiesOrderByOptions.enum'
import { StatusEnum } from '../enum/status.enum'

const isRequired = { required: true }
const isOptional = { required: false }

export class FindFinancialSecuritiesQueryDto extends OrderedAndPagedQueryDto<FinancialSecuritiesOrderByOptionsEnum> {
  @IsOptional()
  @IsNumberString()
  @ApiProperty(isOptional)
  masterLine: number;

  @IsOptional()
  @IsNumberString()
  @ApiProperty(isOptional)
  childLine: number;

  @IsOptional()
  @IsString()
  @ApiProperty(isOptional)
  regional: string;

  @IsOptional()
  @IsString()
  @ApiProperty(isOptional)
  serviceManager: string;

  @IsOptional()
  @IsString()
  @ApiProperty(isOptional)
  matrix: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty(isOptional)
  startDate: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty(isOptional)
  endDate: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  @ApiProperty({ ...isOptional, enum: StatusEnum })
  status: StatusEnum;

  @IsNotEmpty()
  @IsEnum(CompositionReportEnum)
  @ApiProperty({ ...isRequired, enum: CompositionReportEnum })
  type: CompositionReportEnum;

  @IsEnum(FinancialSecuritiesOrderByOptionsEnum)
  @IsOptional()
  @ApiProperty({ required: false, enum: FinancialSecuritiesOrderByOptionsEnum })
  orderBy: FinancialSecuritiesOrderByOptionsEnum;
}
