/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

export class PriceListValues {
  @ApiProperty()
  codigotabelapreco: string

  @ApiProperty()
  nometabelapreco: string

  @ApiProperty()
  codigoempresa: string
}

export class PriceListResponseDto {
  @ApiProperty()
  totalRegister: string

  @ApiProperty()
  page: number

  @ApiProperty()
  dataExecucao: string

  @ApiProperty()
  tabelaPrecos: PriceListValues[]
}
