import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'

import { OrderedAndPagedQueryDto } from '../../../../utils/pagination/orderedQuery.dto'
import { SlaExpirationIndicatorEnum } from '../../enum/slaExpirationTime.enum'
import { SlaOrderByOptionsEnum } from '../../enum/slaOrderByOptions.enum'

export class SlaQuery extends OrderedAndPagedQueryDto<SlaOrderByOptionsEnum> {
  @IsEnum(SlaExpirationIndicatorEnum)
  @IsOptional()
  @ApiProperty({ required: false, enum: SlaExpirationIndicatorEnum })
  expirationIndicator: SlaExpirationIndicatorEnum

  @IsEnum(SlaOrderByOptionsEnum)
  @IsOptional()
  @ApiProperty({ required: false, enum: SlaOrderByOptionsEnum })
  orderBy: SlaOrderByOptionsEnum
}
