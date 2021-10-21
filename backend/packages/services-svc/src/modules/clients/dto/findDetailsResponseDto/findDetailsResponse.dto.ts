/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

import { FindDetailsResponseAddressDto } from './findDetailsResponseAddress.dto'
import { FindDetailsResponseClientGroupDto } from './findDetailsResponseClientGroup.dto'

export class FindDetailsResponseDto {
  @ApiProperty()
  codigoCliente: number

  @ApiProperty()
  nomeCliente: string

  @ApiProperty()
  nomeAbreviadoCliente: string

  @ApiProperty()
  codigoMatriz: number

  @ApiProperty()
  nomeMatriz: string

  @ApiProperty({ type: FindDetailsResponseClientGroupDto })
  grupoCliente: FindDetailsResponseClientGroupDto

  @ApiProperty()
  isMatriz: boolean

  @ApiProperty()
  cnpj: string

  @ApiProperty()
  natureza: number

  @ApiProperty()
  interCompany: string

  @ApiProperty()
  isIntercompany: boolean

  @ApiProperty()
  credito: number

  @ApiProperty({ type: FindDetailsResponseAddressDto })
  endereco: FindDetailsResponseAddressDto

  @ApiProperty({ type: FindDetailsResponseAddressDto })
  enderecoEntrega: FindDetailsResponseAddressDto

  @ApiProperty({ type: FindDetailsResponseAddressDto })
  enderecoCobranca: FindDetailsResponseAddressDto

  @ApiProperty()
  filiais: FindDetailsResponseDto[]

  @ApiProperty()
  email: string

  @ApiProperty()
  inscricaoEstadual: string

  @ApiProperty()
  telefone: string

  @ApiProperty()
  comAgenda: string

  @ApiProperty()
  comAgendaEntrega: boolean

  @ApiProperty()
  paletizacao: boolean

  @ApiProperty()
  situacaoCredito: string

  @ApiProperty()
  statusCadastro: boolean

  @ApiProperty()
  cartaRegime: string

  @ApiProperty()
  razaoSocial: string

  @ApiProperty()
  diasSemFaturamento: number

  @ApiProperty()
  codigoCD: string

  @ApiProperty()
  percentualContratoVPC: number

  @ApiProperty()
  percentualFanVPC: number

  @ApiProperty()
  condicaoPagamento: string

  @ApiProperty()
  markup: number

  @ApiProperty()
  categoriaCliente: number

  @ApiProperty()
  codigoResponsavel: number

  @ApiProperty()
  descricaoResponsavel: string

  @ApiProperty()
  codigoRegional: number

  @ApiProperty()
  descricaoRegional: string

  @ApiProperty()
  emailCobranca: string

  @ApiProperty()
  emailEnvioNotaFiscal: string

  @ApiProperty()
  telefoneCelular: string
}
