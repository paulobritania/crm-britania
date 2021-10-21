import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsObject, ValidateNested } from 'class-validator'

import { IndicatorsDto } from './indicators.dto'

const fieldIsRequired = { required: true }

export class UpdateClientRankingDto {
  @ValidateNested()
  @IsObject()
  @Type(() => IndicatorsDto)
  @ApiProperty({ ...fieldIsRequired, type: IndicatorsDto })
  indicators: IndicatorsDto
}
