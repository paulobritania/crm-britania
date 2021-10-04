import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsObject, ValidateNested } from 'class-validator'

import { IndicatorValuesDto } from './indicatorValues.dto'

const fieldIsRequired = { required: true }

export class RankingsDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(fieldIsRequired)
  id: number

  @ValidateNested()
  @IsObject()
  @Type(() => IndicatorValuesDto)
  @ApiProperty({ ...fieldIsRequired, type: IndicatorValuesDto })
  GROWTH: IndicatorValuesDto

  @ValidateNested()
  @IsObject()
  @Type(() => IndicatorValuesDto)
  @ApiProperty({ ...fieldIsRequired, type: IndicatorValuesDto })
  DEVOLUTION: IndicatorValuesDto

  @ValidateNested()
  @IsObject()
  @Type(() => IndicatorValuesDto)
  @ApiProperty({ ...fieldIsRequired, type: IndicatorValuesDto })
  PRODUCT_INTRODUCTION: IndicatorValuesDto

  @ValidateNested()
  @IsObject()
  @Type(() => IndicatorValuesDto)
  @ApiProperty({ ...fieldIsRequired, type: IndicatorValuesDto })
  PAYMENT_TERMS: IndicatorValuesDto
}