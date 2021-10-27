import { ApiProperty } from '@nestjs/swagger'
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

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(fieldIsRequired)
  name: string

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty(fieldIsRequired)
  active: boolean

  @IsArray()
  @IsOptional()
  @ApiProperty({ ...fieldIsOptional, type: Number, isArray: true })
  permissions: number[]

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @ApiProperty({ ...fieldIsRequired, type: Number, isArray: true })
  access: number[]

  @IsArray()
  @IsOptional()
  @ApiProperty({ ...fieldIsOptional, type: Number, isArray: true })
  micros: number[]

  @IsArray()
  @IsOptional()
  @ApiProperty({ ...fieldIsOptional, type: ExceptionDto, isArray: true })
  exceptions: ExceptionDto[]

  @IsArray()
  @IsOptional()
  @ApiProperty({ ...fieldIsOptional, type: Number, isArray: true })
  users: number[]
}
