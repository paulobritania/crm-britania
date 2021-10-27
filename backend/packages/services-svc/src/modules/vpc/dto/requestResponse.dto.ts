/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

export class RequestItensDto {
  @ApiProperty()
  codigoProduto: string

  @ApiProperty()
  nomeProduto: string

  @ApiProperty()
  quantidadePedida: string

  @ApiProperty()
  quantidadeAtendida: string

  @ApiProperty()
  valorUnitario: number
}

export class RequestResponseDto {
  @ApiProperty()
  itens: RequestItensDto[]

  @ApiProperty()
  codigoCliente: number

  @ApiProperty()
  nomeCliente: string

  @ApiProperty()
  numeroPedido: string

  @ApiProperty()
  dataImplantacao: string
}
