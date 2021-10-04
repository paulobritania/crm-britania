/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested
} from 'class-validator'

const isOptional = { required: false }
const isRequired = { required: true }

class AddressDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  id: number

  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isRequired)
  street: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty(isRequired)
  number: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @ApiProperty(isRequired)
  district: string

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  complement: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @ApiProperty(isRequired)
  city: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @ApiProperty(isRequired)
  country: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  @ApiProperty(isRequired)
  state: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  @ApiProperty(isRequired)
  cep: string
}

class RepresentativeFinancialDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  id: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  clientGroupCode: number

  @IsString()
  @IsOptional()
  @ApiProperty(isOptional)
  clientGroupDescription: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isRequired)
  shortName: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isRequired)
  matrix: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty(isRequired)
  historic: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isRequired)
  carrier: string

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty(isRequired)
  receivesNfe: boolean

  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isRequired)
  bankInstructions: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isRequired)
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

  @IsOptional()
  @IsString()
  @ApiProperty(isOptional)
  expirationDate: string
}

class RepresentativeCommissionPercentageDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  id?: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  workflowRepresentativeRegistrationId: number

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty(isRequired)
  establishmentCode: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty(isRequired)
  establishmentDescription: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  lineCode: number

  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  lineDescription: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  commissionPercentage: number
}

class RepresentativeMaintenanceDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  id: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  representativeType: number

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty(isRequired)
  personType: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty(isRequired)
  country: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  representativeGroupCode: number

  @IsOptional()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isOptional)
  representativeGroupName: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(6)
  @ApiProperty(isRequired)
  paymentCalendar: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  @ApiProperty(isRequired)
  formula: string

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty(isRequired)
  intermediator: boolean

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  generationAdCarrier: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  commissionPercentage: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  commissionEmissionPercentage: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  minimumCommissionPercentage: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  maximumCommissionPercentage: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
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

class RepresentativeDocumentDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty(isOptional)
  id?: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
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
export class UpdateRepresentativePreRegistrationDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty(isRequired)
  id: number

  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isRequired)
  companyName: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(14)
  @ApiProperty(isRequired)
  cnpj: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @ApiProperty(isRequired)
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

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  @ApiProperty(isRequired)
  commercialPhone: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(11)
  @ApiProperty(isOptional)
  billingPhone: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  @ApiProperty(isRequired)
  cellphone: string

  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @ApiProperty(isRequired)
  email: string

  @IsOptional()
  @IsString()
  @MaxLength(40)
  @ApiProperty(isOptional)
  site: string

  @ValidateNested()
  @Type(() => AddressDto)
  @ApiProperty(isRequired)
  address: AddressDto

  @ValidateNested()
  @Type(() => RepresentativeFinancialDto)
  @ApiProperty(isRequired)
  financial: RepresentativeFinancialDto

  @ValidateNested()
  @Type(() => RepresentativeMaintenanceDto)
  @ApiProperty(isRequired)
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
