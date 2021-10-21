import { ApiProperty } from '@nestjs/swagger'

export class ListClientDescriptionDto {
  @ApiProperty()
  parentCompanyCode: number

  @ApiProperty()
  parentCompanyName: string

  @ApiProperty()
  cnpj: string

  @ApiProperty()
  companyName: string
}
