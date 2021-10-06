import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

const isRequired = { required: true }
const isOptional = { required: false }

export class CompanyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @ApiProperty(isRequired)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(14)
  @ApiProperty(isRequired)
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty(isRequired)
  bankCode: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty(isRequired)
  agency: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty(isRequired)
  account: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  @ApiProperty(isOptional)
  identifier: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @ApiProperty(isOptional)
  message: string;
}
