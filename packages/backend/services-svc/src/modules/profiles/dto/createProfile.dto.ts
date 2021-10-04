import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'

import { ExceptionDto } from './exceptions.dto'

const fieldIsRequired = { required: true }
const fieldIsOptional = { required: false }

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(fieldIsRequired)
  name: string

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty(fieldIsRequired)
  active: boolean

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @ApiProperty({ ...fieldIsRequired, type: Number, isArray: true })
  permissions: number[]

  @IsArray()
  @IsOptional()
  @ApiProperty({ ...fieldIsOptional, type: Number, isArray: true })
  access: number[]

  @IsArray()
  @IsOptional()
  @ApiProperty({ ...fieldIsOptional, type: Number, isArray: true })
  micros: number[]

  @IsArray()
  @IsOptional()
  @Type(() => ExceptionDto)
  @ApiProperty({ ...fieldIsOptional, type: ExceptionDto, isArray: true })
  exceptions: ExceptionDto[]

  @IsArray()
  @IsOptional()
  @ApiProperty({ ...fieldIsOptional, type: Number, isArray: true })
  users: number[]
}
