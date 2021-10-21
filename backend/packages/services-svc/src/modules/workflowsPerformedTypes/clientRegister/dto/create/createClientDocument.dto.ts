import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

export class CreateClientDocumentDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  socialContractFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  registrationFormFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  invoicesFromOtherSuppliersFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  billingRatioFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  currentBalanceSheetFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  lpIncomeTaxFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  fpIncomeTaxFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  defisDasnFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  pgdasFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  holderDocumentFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  holderDriverLicenseFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  residenceProofFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  specialRegimeLetterStFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  letterOfTaxationRegimeFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  genericConsultationMatoGrossoFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  nationalSimpleConsultationFileId: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  syntacticQueryFileId: number

  @ApiProperty({ isArray: true, type: Number })
  balanceFileIds: number[]

  @ApiProperty({ isArray: true, type: Number })
  contractualAlterationFileIds: number[]

  @ApiProperty({ isArray: true, type: Number })
  generalFileIds: number[]

  @ApiProperty({ isArray: true, type: Number })
  preFileIds: number[]
}
