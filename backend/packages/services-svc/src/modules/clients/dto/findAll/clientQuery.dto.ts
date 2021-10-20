import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString
} from 'class-validator'

import { OrderedAndPagedQueryDto } from '../../../../utils/pagination/orderedQuery.dto'
import { ClientCategoryEnum } from '../../enum/clientCategory.enum'
import { ClientOrderByEnum } from '../../enum/clientOrderBy.enum'
import { ClientRegistrationStatusEnum } from '../../enum/clientRegistrationStatus.enum'
import { ClientRegistrationTypeEnum } from '../../enum/clientRegistrationType.enum'
import { CreditSituation } from '../../enum/creditSituation.enum'
import { RegimeLetterEnum } from '../../enum/regimeLetter.enum'

const required = { required: true }
const notRequired = { required: false }

export class ClientQueryDto extends OrderedAndPagedQueryDto<ClientOrderByEnum> {
  @IsNotEmpty()
  @IsEnum(ClientRegistrationTypeEnum)
  @ApiProperty({ ...required, enum: ClientRegistrationTypeEnum })
  clientRegistrationType: ClientRegistrationTypeEnum

  @IsOptional()
  @IsEnum(ClientRegistrationStatusEnum)
  @ApiProperty({ ...notRequired, enum: ClientRegistrationStatusEnum })
  clientRegistrationStatus: ClientRegistrationStatusEnum

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  parentCompanyCode: string

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  parentCompany: string

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  shortName: string

  @IsOptional()
  @IsEnum(CreditSituation)
  @ApiProperty({ ...notRequired, enum: CreditSituation })
  creditSituation: CreditSituation

  @IsOptional()
  @IsNumberString()
  @ApiProperty(notRequired)
  daysWithoutBilling: number

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  cnpj: string

  @IsOptional()
  @IsEnum(RegimeLetterEnum)
  @ApiProperty({ ...notRequired, enum: RegimeLetterEnum })
  regimeLetter: RegimeLetterEnum

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  cdCode: string

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  responsibleService: string

  @IsOptional()
  @IsNumberString()
  @ApiProperty(notRequired)
  regionalManager: number

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  companyName: string

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  registrationInclusionDate: string

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  registrationConclusionDate: string

  @IsOptional()
  @IsNumberString()
  @ApiProperty(notRequired)
  workflowTypeId: number

  @IsOptional()
  @IsNumberString()
  @ApiProperty(notRequired)
  workflowId: number

  @IsOptional()
  @IsNumberString()
  @ApiProperty(notRequired)
  workflowTaskId: number

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  state: string

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  city: string

  @IsOptional()
  @IsEnum(ClientCategoryEnum)
  @ApiProperty({ ...notRequired, enum: ClientCategoryEnum })
  category: ClientCategoryEnum

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  clientGroup: string

  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  strategicClient: boolean

  @IsOptional()
  @IsEnum(ClientOrderByEnum)
  @ApiProperty({ ...notRequired, enum: ClientOrderByEnum })
  orderBy: ClientOrderByEnum
}
