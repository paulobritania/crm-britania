import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsBoolean, IsDateString } from 'class-validator'

export class CreateClientParametrizationFiscal {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  doNotRetainIcms: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  icmsSubstitute: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  icmsTaxpayer: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  optingSuspensionsIpi: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  buysPhilco: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  withholdTax: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  retentionAgent: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  fullNonAcumulative: boolean

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  expirationDate: Date
}
