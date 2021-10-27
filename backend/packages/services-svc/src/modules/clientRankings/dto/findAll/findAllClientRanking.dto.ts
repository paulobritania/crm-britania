import { ApiProperty } from '@nestjs/swagger'

import { IndicatorsDto } from './indicators.dto'

export class FindAllClientRankingDto {
  @ApiProperty()
  updatedBy: string

  @ApiProperty()
  updatedAt: string

  @ApiProperty({ type: IndicatorsDto })
  indicators: IndicatorsDto
}
