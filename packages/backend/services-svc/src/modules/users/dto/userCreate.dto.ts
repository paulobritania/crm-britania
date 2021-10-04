import { ApiProperty } from '@nestjs/swagger'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Validate
} from 'class-validator'

import { IsBeforeOrEqualThan } from '../../../utils/validations/isBeforeOrEqualThanValidator'
import { IsValidPeriodValidator } from '../../../utils/validations/isValidPeriodValidator'

const fieldIsOptional = { required: false }
const fieldIsRequired = { required: true }

export class CreateUserDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  imageId: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty(fieldIsRequired)
  username: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty(fieldIsRequired)
  email: string

  @IsString()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  @Matches(/^[0-9]*$/, { message: 'The phone must have only numbers' })
  phone: string

  @IsArray()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  representativeCodes: string[]

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty(fieldIsRequired)
  customerHierarchyEnabled: boolean

  @IsNumber()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  substituteUserId: number

  @IsDateString()
  @IsOptional()
  @Validate(IsBeforeOrEqualThan, ['substituteUserEndDate'])
  @ApiProperty(fieldIsOptional)
  substituteUserStartDate: Date

  @IsDateString()
  @IsOptional()
  @Validate(IsValidPeriodValidator, ['substituteUserStartDate'])
  @ApiProperty(fieldIsOptional)
  substituteUserEndDate: Date

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty(fieldIsRequired)
  isActive: boolean

  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  @ArrayMinSize(1)
  @ApiProperty({ ...fieldIsRequired, type: Number, isArray: true })
  profiles: number[]
}
