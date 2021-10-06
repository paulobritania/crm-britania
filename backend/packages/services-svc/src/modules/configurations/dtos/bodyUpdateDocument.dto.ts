import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

import { ConfigurationTypeEnum } from '../enums/ConfigurationType.enum'

const isRequired = { required: true }
const isOptional = { required: false }

export class BodyUpdateDocumentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(70)
  @ApiProperty(isRequired)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  @ApiProperty(isOptional)
  observation: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ConfigurationTypeEnum)
  @ApiProperty({ ...isRequired, enum: ConfigurationTypeEnum })
  alias: ConfigurationTypeEnum;
}

