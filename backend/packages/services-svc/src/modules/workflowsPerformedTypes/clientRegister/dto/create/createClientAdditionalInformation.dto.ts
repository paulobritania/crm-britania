import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested
} from 'class-validator'

import { InitialContactEnum } from '../../enum/InitialContact.enum'
import { CreateClientAdditionalInformationBankReferenceDto } from './createClientAdditionalInformationBankReference.dto'
import { CreateClientAdditionalInformationCommercialReferenceDto } from './createClientAdditionalInformationCommercialReference.entity.dto'
import { CreateClientAdditionalInformationCounterDto } from './createClientAdditionalInformationCounter.dto'
import { CreateClientAdditionalInformationParticipationCompanyDto } from './createClientAdditionalInformationParticipationCompany.dto'
import { CreateClientAdditionalInformationRevenueDto } from './createClientAdditionalInformationRevenue.dto'

const required = { required: true }

export class CreateClientAdditionalInformation {
  @IsOptional()
  @IsString()
  @ApiProperty({ enum: InitialContactEnum })
  initialContact: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  numbersOfEmployes: number

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  suggestedLimit: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  observation: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  shareCapital: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientAdditionalInformationRevenueDto)
  @ApiProperty({
    ...required,
    type: CreateClientAdditionalInformationRevenueDto,
    isArray: true
  })
  revenues: CreateClientAdditionalInformationRevenueDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientAdditionalInformationCommercialReferenceDto)
  @ApiProperty({
    ...required,
    type: CreateClientAdditionalInformationCommercialReferenceDto,
    isArray: true
  })
  commercialReferences?: CreateClientAdditionalInformationCommercialReferenceDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientAdditionalInformationBankReferenceDto)
  @ApiProperty({
    ...required,
    type: CreateClientAdditionalInformationBankReferenceDto,
    isArray: true
  })
  bankReferences: CreateClientAdditionalInformationBankReferenceDto[]

  @ValidateNested()
  @Type(() => CreateClientAdditionalInformationCounterDto)
  @ApiProperty({
    ...required,
    type: CreateClientAdditionalInformationCounterDto
  })
  counter: CreateClientAdditionalInformationCounterDto

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClientAdditionalInformationParticipationCompanyDto)
  @ApiProperty({
    ...required,
    type: CreateClientAdditionalInformationParticipationCompanyDto,
    isArray: true
  })
  participationsCompany?: CreateClientAdditionalInformationParticipationCompanyDto[]
}
