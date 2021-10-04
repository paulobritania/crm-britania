import { ApiProperty } from '@nestjs/swagger'

import { RankingsDto } from './rankings.dto'

export class IndicatorsDto {
  @ApiProperty({ type: RankingsDto })
  DIAMOND: RankingsDto

  @ApiProperty({ type: RankingsDto })
  GOLD: RankingsDto

  @ApiProperty({ type: RankingsDto })
  SILVER: RankingsDto

  @ApiProperty({ type: RankingsDto })
  BRONZE: RankingsDto
}