import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString
} from 'class-validator'

import { OrderBySortEnum } from '../../../../utils/pagination/orderByDirection.enum'
import { WorkflowOrderByOptions } from '../../enum/workflowOrderByOptions.enum'
import { WorkflowStatusEnum } from '../../enum/workflowStatus.enum'

const notRequired = { required: false }

export class WorkflowsQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  title?: string

  @IsNumberString()
  @IsOptional()
  @ApiProperty(notRequired)
  typeId?: string

  @IsEnum(WorkflowStatusEnum)
  @IsOptional()
  @ApiProperty({ ...notRequired, enum: WorkflowStatusEnum })
  status?: WorkflowStatusEnum

  @IsDateString()
  @IsOptional()
  @ApiProperty(notRequired)
  dateStart?: string

  @IsDateString()
  @IsOptional()
  @ApiProperty(notRequired)
  dateEnd?: string

  @IsNumberString()
  @IsOptional()
  @ApiProperty(notRequired)
  limit?: string

  @IsNumberString()
  @IsOptional()
  @ApiProperty(notRequired)
  offset?: string

  @IsEnum(WorkflowOrderByOptions)
  @IsOptional()
  @ApiProperty({ ...notRequired, enum: WorkflowOrderByOptions })
  orderBy?: WorkflowOrderByOptions

  @IsEnum(OrderBySortEnum)
  @IsOptional()
  @ApiProperty({ ...notRequired, enum: OrderBySortEnum })
  orderBySort?: OrderBySortEnum
}
