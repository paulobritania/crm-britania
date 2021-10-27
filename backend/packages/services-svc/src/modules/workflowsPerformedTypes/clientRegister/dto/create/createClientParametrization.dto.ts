import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator'

export class CreateClientParametrization {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  clientGroupCode: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  shortName: string

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  parentCompanyCode: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  parentCompany: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  historic: string

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  intermediary: boolean
}
