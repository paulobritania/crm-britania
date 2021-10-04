import { ApiProperty } from '@nestjs/swagger'

export class FindDetailsMainDataDto {
  @ApiProperty()
  parentCompanyCode: number

  @ApiProperty()
  parentCompanyName: string

  @ApiProperty()
  clientTotvsCode: number

  @ApiProperty()
  cnpj: string

  @ApiProperty()
  socialReason: string

  @ApiProperty()
  branches: string

  @ApiProperty()
  commercialPhone: string

  @ApiProperty()
  cellPhone: string

  @ApiProperty()
  logisticsInformation: string

  @ApiProperty()
  creditSituation: string

  @ApiProperty()
  regimeLetter: string

  @ApiProperty()
  daysWithoutBilling: number

  @ApiProperty()
  customerRanking: string

  @ApiProperty()
  status: string
}
