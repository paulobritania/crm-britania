import { ApiProperty } from '@nestjs/swagger'

export class ProductDetailsResponseDto {
  @ApiProperty()
  codigoProduto: number

  @ApiProperty()
  descricaoProduto: string

  @ApiProperty()
  codigoLinhaPai: number

  @ApiProperty()
  descricaoLinhaPai: string

  @ApiProperty()
  codigoLinha: number

  @ApiProperty()
  descricaoLinha: string

  @ApiProperty()
  codigoFamiliaMaterial: string

  @ApiProperty()
  descricaoFamiliaMaterial: string

  @ApiProperty()
  codigoProdutoComercial: string

  @ApiProperty()
  descricaoProdutoComercial: string

  @ApiProperty()
  codigoGrupoEstoque: number

  @ApiProperty()
  descricaoGrupoEstoque: string

  @ApiProperty()
  foraLinha: boolean

  @ApiProperty()
  foraLinhaImportacao: boolean

  @ApiProperty()
  itemCritico: boolean
}
