import { ApiProperty } from '@nestjs/swagger'

export class FindAllRepresentativesRegistrationReturnDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  companyName: string

  @ApiProperty()
  cnpj: string

  @ApiProperty()
  commercialPhone: string

  @ApiProperty()
  email: string

  @ApiProperty()
  shortName: string

  @ApiProperty()
  status: string

  @ApiProperty()
  workflowTaskTitle?: string
}
