import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsString,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  MaxLength
} from 'class-validator'

import { CreateClientAdditionalInformation } from './createClientAdditionalInformation.dto'
import { CreateClientCadastralCheck } from './createClientCadastralCheck.dto'
import { CreateClientDocumentDto } from './createClientDocument.dto'
import { CreateClientFinancialDto } from './createClientFinancialDto'
import { CreateClientFiscalInformationDto } from './createClientFiscalInformation.dto'
import { CreateClientParametrization } from './createClientParametrization.dto'
import { CreateClientParametrizationFiscal } from './createClientParametrizationFiscal.dto'
import { CreateClientPriceListDto } from './createClientPriceList.dto'
import { CreateClientRegistrationInformationDto } from './createClientRegistrationInformation.dto'
import { CreateClientParametrizationFiscalCfopDto } from './createParametrizationFiscalCfop.dto'

const required = { required: true }

export class CreateClientRegisterDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  companyName: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(14)
  @ApiProperty()
  cnpj: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  stateRegistration: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  suframa: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  commercialPhone: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  billingPhone: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  cellphone: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  shoppingPhone: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  billingEmail: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  invoiceShippingEmail: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  businessEmail: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  site: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  publicPlace: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  complement: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  number: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  district: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  city: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  country: string

  @IsString()
  @IsOptional()
  @MaxLength(2)
  @ApiProperty()
  state: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  zipCode: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  parentCompanyName: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  parentCompanyCnpj: string

  @ValidateNested({ each: true })
  @Type(() => CreateClientAdditionalInformation)
  @ApiProperty({
    ...required,
    type: CreateClientAdditionalInformation
  })
  additionalInformation: CreateClientAdditionalInformation

  @ValidateNested({ each: true })
  @Type(() => CreateClientFiscalInformationDto)
  @ApiProperty({
    ...required,
    type: CreateClientFiscalInformationDto
  })
  fiscalInformation?: CreateClientFiscalInformationDto

  @ValidateNested({ each: true })
  @Type(() => CreateClientRegistrationInformationDto)
  @ApiProperty({
    ...required,
    type: CreateClientRegistrationInformationDto
  })
  registrationInformation: CreateClientRegistrationInformationDto

  @ValidateNested({ each: true })
  @Type(() => CreateClientFinancialDto)
  @ApiProperty({
    ...required,
    type: CreateClientFinancialDto
  })
  financial: CreateClientFinancialDto

  @ValidateNested({ each: true })
  @Type(() => CreateClientCadastralCheck)
  @ApiProperty({
    ...required,
    type: CreateClientCadastralCheck
  })
  cadastralCheck: CreateClientCadastralCheck

  @ValidateNested({ each: true })
  @Type(() => CreateClientParametrization)
  @ApiProperty({
    ...required,
    type: CreateClientParametrization
  })
  parametrization: CreateClientParametrization

  @ValidateNested({ each: true })
  @Type(() => CreateClientPriceListDto)
  @ApiProperty({
    ...required,
    type: CreateClientPriceListDto
  })
  priceList: CreateClientPriceListDto

  @ValidateNested({ each: true })
  @Type(() => CreateClientDocumentDto)
  @ApiProperty({
    ...required,
    type: CreateClientDocumentDto
  })
  documents?: CreateClientDocumentDto

  @ValidateNested({ each: true })
  @Type(() => CreateClientParametrizationFiscal)
  @ApiProperty({
    ...required,
    type: CreateClientParametrizationFiscal
  })
  fiscalParametrization: CreateClientParametrizationFiscal

  @ValidateNested({ each: true })
  @Type(() => CreateClientParametrizationFiscalCfopDto)
  @ApiProperty({
    ...required,
    type: CreateClientParametrizationFiscalCfopDto
  })
  fiscalParametrizationCfop?: CreateClientParametrizationFiscalCfopDto
}
