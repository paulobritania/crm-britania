import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, IsOptional } from 'class-validator'

const fieldIsRequired = { required: true }

export class FileTypeDto {
  @IsString()
  @IsOptional()
  @ApiProperty(fieldIsRequired)
  fieldname: string;

  @IsString()
  @IsOptional()
  @ApiProperty(fieldIsRequired)
  originalname: string;

  @IsString()
  @IsOptional()
  @ApiProperty(fieldIsRequired)
  encoding: string;

  @IsString()
  @IsOptional()
  @ApiProperty(fieldIsRequired)
  mimetype: string;

  @IsString()
  @IsOptional()
  @ApiProperty(fieldIsRequired)
  destination: string;

  @IsString()
  @IsOptional()
  @ApiProperty(fieldIsRequired)
  filename: string;

  @IsString()
  @IsOptional()
  @ApiProperty(fieldIsRequired)
  path: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty(fieldIsRequired)
  size: number;
}
