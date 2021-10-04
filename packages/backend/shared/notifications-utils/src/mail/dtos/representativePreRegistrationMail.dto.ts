/* eslint-disable max-classes-per-file */
class RepresentativePreRegistrationMailResponsesDto {
  respondedAt: string

  taskTitle: string

  responseTitle: string

  responseJustification: string
}

export class RepresentativePreRegistrationMailDto {
  companyName: string

  cnpj: string

  taskTitle: string

  deadline: number

  dateLimit: string

  client: string

  clientResponsible: string

  responses: RepresentativePreRegistrationMailResponsesDto[]
}
