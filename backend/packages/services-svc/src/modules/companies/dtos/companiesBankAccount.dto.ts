import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator'

export class CompaniesBankAccountDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  companyId: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  @ApiProperty({ required: true })
  bankCode: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 10)
  @ApiProperty({ required: true })
  agency: string;

  @IsString()
  @IsNotEmpty()
  @Length(0, 10)
  @ApiProperty({ required: true })
  account: string;

  @IsString()
  @Length(0, 500)
  @IsOptional()
  @ApiProperty()
  note: string;
}
