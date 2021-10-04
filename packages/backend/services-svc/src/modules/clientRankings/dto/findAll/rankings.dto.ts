import { ApiProperty } from '@nestjs/swagger'

import { IndicatorValuesDto } from './indicatorValues.dto'

export class RankingsDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  description: string

  @ApiProperty({ type: IndicatorValuesDto })
  GROWTH: IndicatorValuesDto

  @ApiProperty({ type: IndicatorValuesDto })
  DEVOLUTION: IndicatorValuesDto

  @ApiProperty({ type: IndicatorValuesDto })
  PRODUCT_INTRODUCTION: IndicatorValuesDto

  @ApiProperty({ type: IndicatorValuesDto })
  PAYMENT_TERMS: IndicatorValuesDto
}