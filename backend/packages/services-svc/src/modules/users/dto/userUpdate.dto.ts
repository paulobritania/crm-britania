import { ApiProperty } from '@nestjs/swagger'
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Validate
} from 'class-validator'

import { IsBeforeOrEqualThan } from '../../../utils/validations/isBeforeOrEqualThanValidator'
import { IsValidPeriodValidator } from '../../../utils/validations/isValidPeriodValidator'

const fieldIsOptional = { required: false }

export class UpdateUserDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  imageId: number

  @IsString()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  username: string

  @IsString()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
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
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  customerHierarchyEnabled: boolean

  @IsNumber()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  substituteUserId: number

  @IsDateString()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  @Validate(IsBeforeOrEqualThan, ['substituteUserEndDate'])
  substituteUserStartDate: Date

  @IsDateString()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  @Validate(IsValidPeriodValidator, ['substituteUserStartDate'])
  substituteUserEndDate: Date

  @IsBoolean()
  @IsOptional()
  @ApiProperty(fieldIsOptional)
  isActive: boolean

  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  @ArrayMinSize(1)
  @ApiProperty({ required: true, type: Number, isArray: true })
  profiles: number[]
}
