export class GetClientsQueryDto {
  q?: string

  nomeCliente?: string

  nomeAbreviadoCliente?: string

  ativo?: boolean

  situacaoCredito?: string

  categoriaCliente?: string

  diasSemFaturamento?: number

  cartaRegime?: string

  cnpj?: string

  codigoCD?: string

  codigoRegional?: number

  descricaoResponsavel?: string

  estado?: string

  cidade?: string

  somenteMatriz?: boolean

  codigoMatriz?: string

  codigoGrupoCliente?: string

  razaoSocial?: string

  sort?: string

  page?: number

  pageSize?: number
}
