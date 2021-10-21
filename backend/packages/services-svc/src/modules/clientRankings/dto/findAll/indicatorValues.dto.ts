import { ApiProperty } from '@nestjs/swagger'

import { SymbolsEnum } from '../../enum/symbols.enum'

export class IndicatorValuesDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  description: string

  @ApiProperty({ enum: SymbolsEnum })
  symbol: SymbolsEnum

  @ApiProperty()
  goal: number

  @ApiProperty()
  weight: number
}