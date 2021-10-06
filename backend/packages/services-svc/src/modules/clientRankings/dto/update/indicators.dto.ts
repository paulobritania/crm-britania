import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsObject, ValidateNested } from 'class-validator'

import { RankingsDto } from './rankings.dto'

const fieldIsRequired = { required: true }

export class IndicatorsDto {
  @ValidateNested()
  @IsObject()
  @Type(() => RankingsDto)
  @ApiProperty({ ...fieldIsRequired, type: RankingsDto })
  DIAMOND: RankingsDto

  @ValidateNested()
  @IsObject()
  @Type(() => RankingsDto)
  @ApiProperty({ ...fieldIsRequired, type: RankingsDto })
  GOLD: RankingsDto

  @ValidateNested()
  @IsObject()
  @Type(() => RankingsDto)
  @ApiProperty({ ...fieldIsRequired, type: RankingsDto })
  SILVER: RankingsDto

  @ValidateNested()
  @IsObject()
  @Type(() => RankingsDto)
  @ApiProperty({ ...fieldIsRequired, type: RankingsDto })
  BRONZE: RankingsDto
}