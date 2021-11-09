import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

const isRequired = { required: true }
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
  @ApiProperty(isRequired)
  identifier: string;
}
