// eslint-disable-next-line max-classes-per-file
class ClientResponse {
  codigocliente: number

  nomecliente: string

  nomeabreviadocliente: string

  codigomatriz: number

  nomematriz: string

  codigogrupocliente: number

  nomegrupocliente: string

  estado: string

  cidade: string

  pais: string

  ismatriz: boolean

  cnpj: string

  natureza: number

  intercompany: string

  isintercompany: boolean

  credito: number

  bairro: string

  cep: string

  bairrocobranca: string

  bairroentrega: string

  cepcobranca: string

  cepentrega: string

  cidadecobranca: string

  cidadeentrega: string

  email: string

  endereco: string

  enderecocobranca: string

  enderecoentrega: string

  estadocobranca: string

  estadoentrega: string

  inscricaoestadual: string

  paiscobranca: string

  paisentrega: string

  telefone: string

  comagenda: string

  comagendaentrega: boolean

  paletizacao: boolean

  situacaocredito: number

  statuscadastro: number

  cartaregime: string

  razaosocial: string

  diassemfaturamento: number

  dataultimofaturamento: string

  codigocd: string

  percentualcontratovpc: number

  percentualfanvpc: number

  condicaopagamento: string

  markup: number

  categoriacliente: number

  codigoresponsavel: number

  descricaoresponsavel: string

  codigoregional: number

  descricaoregional: string

  numerofiliais: number
}

export class GetClientsResponseDto {
  totalRegisters: number

  page: number

  dataExecucao: string

  clientes: ClientResponse[]
}
