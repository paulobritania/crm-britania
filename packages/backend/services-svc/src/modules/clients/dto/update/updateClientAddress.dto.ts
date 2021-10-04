import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength
} from 'class-validator'

const required = { required: true }
const notRequired = { required: false }

export class UpdateClientAddressDto {
  @ApiProperty(notRequired)
  @IsString()
  @MaxLength(10)
  @IsOptional()
  zipCode: string

  @ApiProperty(notRequired)
  @IsString()
  @IsOptional()
  @MaxLength(70)
  publicPlace: string

  @ApiProperty(required)
  @IsNumber()
  @IsNotEmpty()
  number: number

  @ApiProperty(notRequired)
  @IsString()
  @IsOptional()
  @MaxLength(40)
  district: string

  @ApiProperty(notRequired)
  @IsString()
  @IsOptional()
  @MaxLength(70)
  complement: string

  @ApiProperty(required)
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  city: string

  @ApiProperty(required)
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  state: string

  @ApiProperty(required)
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  country: string

  @ApiProperty(notRequired)
  @IsString()
  @IsOptional()
  @MaxLength(11)
  @Matches(/^[0-9]*$/, { message: 'phone must have only numbers' })
  phone: string

  @ApiProperty(notRequired)
  @IsString()
  @IsEmail()
  @IsOptional()
  @MaxLength(40)
  email: string
}
