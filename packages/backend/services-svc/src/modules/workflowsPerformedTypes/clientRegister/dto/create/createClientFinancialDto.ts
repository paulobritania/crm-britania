import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator'

export class CreateClientFinancialDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  issueBankSlip: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  generatesDebitNotice: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  calculatesFine: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  receivesNfe: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  simpleClient: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  receivesSciInformation: boolean

  @MaxLength(5)
  @IsOptional()
  @IsString()
  @ApiProperty()
  standardIncome: string

  @IsOptional()
  @IsString()
  @MaxLength(8)
  @ApiProperty()
  carrier: string

  @MaxLength(5)
  @IsOptional()
  @IsString()
  @ApiProperty()
  bankInstruction: string
}
