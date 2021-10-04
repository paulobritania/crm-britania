/* eslint-disable max-classes-per-file */
class ErrorResponse {
  msg: string
}

export class IntegrationResponse {
  status: string

  'cod-rep': string

  erros: ErrorResponse[]
}
