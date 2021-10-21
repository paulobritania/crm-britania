import { ApiProperty } from '@nestjs/swagger'

import { ClientRegistrationTypeEnum } from '../../enum/clientRegistrationType.enum'
import { ClientStatusEnum } from '../../enum/clientStatus.enum'
import { RankingDto } from './ranking.dto'

export class ParentCompanyDto {
  @ApiProperty()
  id?: number

  @ApiProperty()
  parentCompany: string

  @ApiProperty()
  parentCompanyCode: number

  @ApiProperty()
  logisticInformation: string

  @ApiProperty()
  creditSituation: string

  @ApiProperty()
  regimeLetter: string

  @ApiProperty()
  daysWithoutBilling: number

  @ApiProperty({ type: RankingDto })
  ranking: RankingDto

  @ApiProperty()
  active: boolean

  @ApiProperty()
  branchCount: number

  @ApiProperty()
  cnpj: string

  @ApiProperty()
  businessName: string

  @ApiProperty({ enum: ClientStatusEnum })
  status: ClientStatusEnum

  @ApiProperty({ enum: ClientRegistrationTypeEnum })
  clientRegistrationType: ClientRegistrationTypeEnum
}
