import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator'

import { SymbolsEnum } from '../../enum/symbols.enum'

const fieldIsRequired = { required: true }

export class IndicatorValuesDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(fieldIsRequired)
  id: number

  @IsEnum(SymbolsEnum)
  @ApiProperty({ enum: SymbolsEnum })
  symbol: SymbolsEnum

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(fieldIsRequired)
  goal: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(fieldIsRequired)
  weight: number
}