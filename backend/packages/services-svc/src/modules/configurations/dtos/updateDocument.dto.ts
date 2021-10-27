import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

import { FileTypeDto } from '../../settings/dto/fileType.dto'

const isRequired = { required: true }
const isOptional = { required: false }

export class UpdateDocumentDto {
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
  @ApiProperty(isRequired)
  alias: string;

  @IsOptional()
  @ApiProperty({ ...isOptional, type: 'string', format: 'binary' })
  file: FileTypeDto
}

