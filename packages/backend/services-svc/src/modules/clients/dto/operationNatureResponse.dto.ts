/* eslint-disable max-classes-per-file */
export class OperationNatureValues {
  codigonaturezaoperacao: string

  nomenaturezaoperacao: string
}

export class OperationNatureResponseDto {
  totalRegister: string

  page: number

  dataExecucao: string

  naturezaOperacaos: OperationNatureValues[]
}
