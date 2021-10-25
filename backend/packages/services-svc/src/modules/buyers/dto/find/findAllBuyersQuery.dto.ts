import { ApiProperty } from '@nestjs/swagger'
import {
  IsBooleanString,
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Validate
} from 'class-validator'

import { IsStringifiedNumberArray } from '../../../../utils/validations/isStringifiedNumberArrayValidator'
import { VoltageEnum } from '../../enum/Voltage.enum'

const notRequired = { required: false }

export class FindAllBuyersQueryDto {

  @IsNumberString()
  @IsOptional()
  @ApiProperty(notRequired)
  id: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty(notRequired)
  clientTotvsCode: number;

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  name: string;

  @IsBooleanString()
  @IsOptional()
  @ApiProperty(notRequired)
  active: boolean;

  @Validate(IsStringifiedNumberArray)
  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  lineCodes: string;

  @IsString()
  @IsOptional()
  @Length(11, 11)
  @ApiProperty(notRequired)
  cpf: string;

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  category: string;

  @IsEnum(VoltageEnum)
  @IsOptional()
  @ApiProperty({ enum: VoltageEnum, required: false })
  voltage: string;

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  role: string;

  @IsString()
  @IsOptional()
  @Length(5, 5)
  @ApiProperty(notRequired)
  birthday: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty(notRequired)
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  telephone: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty(notRequired)
  responsibleCode: number;

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  responsibleDescription: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty(notRequired)
  imageId: number;

  @ApiProperty(notRequired)
  offset: string;

  @ApiProperty(notRequired)
  limit: string;
}
