export class RepresentativesResponseDto {
  totalRegisters: number

  page: number

  dataExecucao: string

  representantes: Array<{
    codigorepresentante: number

    nomerepresentante: string
  }>
}
