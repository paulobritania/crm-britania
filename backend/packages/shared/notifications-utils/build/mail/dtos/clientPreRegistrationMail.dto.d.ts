/* eslint-disable max-classes-per-file */
export class ClientPreRegistrationMailResponsesDto {
  respondedAt: string

  taskTitle: string

  responseTitle: string

  responseJustification: string
}

export class ClientPreRegistrationMailDto {
  companyName: string

  cnpj: string

  taskTitle: string

  deadline: number

  dateLimit: string

  client: string

  clientResponsible: string

  responses: ClientPreRegistrationMailResponsesDto[]
}
