import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

import { OrderedAndPagedQueryDto } from '../../../../utils/pagination/orderedQuery.dto'
import { UnidentifiedFoundsOrderByOptions } from '../../enum/unidentifiedFoundsOrderByOptions.enum'

export class UnidentifiedFoundsQueryDto extends OrderedAndPagedQueryDto<UnidentifiedFoundsOrderByOptions> {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  companyCode: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  period: string

  @IsEnum(UnidentifiedFoundsOrderByOptions)
  @IsOptional()
  @ApiProperty({ required: false, enum: UnidentifiedFoundsOrderByOptions })
  orderBy: UnidentifiedFoundsOrderByOptions
}
