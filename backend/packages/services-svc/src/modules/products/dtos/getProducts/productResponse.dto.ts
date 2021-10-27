/* eslint-disable max-classes-per-file */
export class ProductResponse {
  codigoproduto: string

  descricaoproduto: string

  codigolinhapai: number

  descricaolinhapai: string

  codigolinha: number

  descricaolinha: string

  codigofamiliamaterial: string

  descricaofamiliamaterial: string

  codigoprodutocomercial: string

  descricaoprodutocomercial: string

  codigogrupoestoque: number

  descricaogrupoestoque: string

  foralinha: boolean

  foralinhaimportacao: boolean

  itemcritico: boolean
}

export class ProductListResponseDto {
  totalRegisters: number

  produtos: ProductResponse[]
}
