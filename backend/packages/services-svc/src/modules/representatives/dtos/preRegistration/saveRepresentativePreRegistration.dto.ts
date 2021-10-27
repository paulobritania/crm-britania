/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
  IsDateString,
  IsNumberString
} from 'class-validator'

const isOptional = { required: false }
const isRequired = { required: true }

class AddressDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  id?: number

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  street: string

  @IsOptional()
  @IsString()
  @MaxLength(10)
  @ApiProperty(isOptional)
  number: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  @ApiProperty(isOptional)
  district: string

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  complement: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  @ApiProperty(isOptional)
  city: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  @ApiProperty(isOptional)
  country: string

  @IsOptional()
  @IsString()
  @MaxLength(2)
  @ApiProperty(isOptional)
  state: string

  @IsOptional()
  @IsString()
  @MaxLength(8)
  @ApiProperty(isOptional)
  cep: string
}

class RepresentativeFinancialDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  id?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  clientGroupCode: number

  @IsString()
  @IsOptional()
  @ApiProperty(isOptional)
  clientGroupDescription: string

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  shortName: string

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  matrix: string

  @IsOptional()
  @IsString()
  @ApiProperty(isOptional)
  historic: string

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  carrier: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty(isOptional)
  receivesNfe: boolean

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  bankInstructions: string

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  standardIncomeInstructions: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty(isOptional)
  issueBankSlip: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty(isOptional)
  generatesDebitNotice: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty(isOptional)
  calculatesFine: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty(isOptional)
  receivesSciInformation: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty(isOptional)
  simpleClient: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty(isOptional)
  icmsTaxpayer: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty(isOptional)
  buysPhilco: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty(isOptional)
  fullNonCumulative: boolean

  @IsDateString()
  @IsOptional()
  @ApiProperty(isOptional)
  expirationDate: string
}

export class RepresentativeCommissionPercentageDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  id?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  workflowRepresentativeRegistrationId?: number

  @IsNumberString()
  @IsOptional()
  @ApiProperty(isOptional)
  establishmentCode: string

  @IsOptional()
  @IsString()
  @ApiProperty(isOptional)
  establishmentDescription: string

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  lineCode: number

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  lineDescription: string

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  commissionPercentage: number
}

class RepresentativeMaintenanceDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  id?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  representativeType: number

  @IsOptional()
  @IsString()
  @MaxLength(10)
  @ApiProperty(isOptional)
  personType: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @ApiProperty(isOptional)
  country: string

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  representativeGroupCode: number

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  representativeGroupName: string

  @IsOptional()
  @IsString()
  @MaxLength(6)
  @ApiProperty(isOptional)
  paymentCalendar: string

  @IsOptional()
  @IsString()
  @MaxLength(12)
  @ApiProperty(isOptional)
  formula: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty(isOptional)
  intermediator: boolean

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  generationAdCarrier: number

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  commissionPercentage: number

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  commissionEmissionPercentage: number

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  minimumCommissionPercentage: number

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  maximumCommissionPercentage: number

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  manualCommission: number
}

class RepresentativeBankDataDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  id?: number

  @IsOptional()
  @IsString()
  @MaxLength(4)
  @ApiProperty(isOptional)
  code: string

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  name: string

  @IsOptional()
  @IsString()
  @MaxLength(7)
  @ApiProperty(isOptional)
  agency: string

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @ApiProperty(isOptional)
  account: string
}

export class RepresentativeDocumentDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  id?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  fileId: number

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  name: string

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty(isOptional)
  observation: string
}

export class SaveRepresentativePreRegistrationDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  id?: number

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  companyName: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(14)
  @ApiProperty(isRequired)
  cnpj: string

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @ApiProperty(isOptional)
  contactName: string

  @IsOptional()
  @IsString()
  @MaxLength(14)
  @ApiProperty(isOptional)
  stateRegistration: string

  @IsOptional()
  @IsString()
  @MaxLength(14)
  @ApiProperty(isOptional)
  suframa: string

  @IsOptional()
  @IsString()
  @MaxLength(11)
  @ApiProperty(isOptional)
  commercialPhone: string

  @IsOptional()
  @IsString()
  @MaxLength(11)
  @ApiProperty(isOptional)
  billingPhone: string

  @IsOptional()
  @IsString()
  @MaxLength(12)
  @ApiProperty(isOptional)
  cellphone: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  @ApiProperty(isOptional)
  email: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  @ApiProperty(isOptional)
  site: string

  @ValidateNested()
  @Type(() => AddressDto)
  @ApiProperty(isOptional)
  address: AddressDto

  @ValidateNested()
  @Type(() => RepresentativeFinancialDto)
  @ApiProperty(isOptional)
  financial: RepresentativeFinancialDto

  @ValidateNested()
  @Type(() => RepresentativeMaintenanceDto)
  @ApiProperty(isOptional)
  maintenance: RepresentativeMaintenanceDto

  @ValidateNested()
  @Type(() => RepresentativeCommissionPercentageDto)
  @ApiProperty({
    ...isOptional,
    type: RepresentativeCommissionPercentageDto,
    isArray: true
  })
  commissionPercentage: RepresentativeCommissionPercentageDto[]

  @ValidateNested()
  @Type(() => RepresentativeBankDataDto)
  @IsOptional()
  @ApiProperty(isOptional)
  bankData: RepresentativeBankDataDto

  @ValidateNested()
  @Type(() => RepresentativeDocumentDto)
  @IsOptional()
  @ApiProperty({
    ...isOptional,
    type: RepresentativeDocumentDto,
    isArray: true
  })
  documents: RepresentativeDocumentDto[]
}
