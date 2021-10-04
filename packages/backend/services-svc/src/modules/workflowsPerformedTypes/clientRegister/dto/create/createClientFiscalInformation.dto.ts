import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsBoolean } from 'class-validator'

export class CreateClientFiscalInformationDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  specialTaxSubstitutionRegime: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  clientFromMatoGrosso: boolean

  @IsOptional()
  @IsString()
  @ApiProperty()
  taxRegime: string
}
