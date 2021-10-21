import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsString,
  IsNotEmpty,
  Length,
  ValidateNested,
  IsArray,
  ArrayMinSize,
  IsNumber,
  IsEnum,
  IsOptional,
  IsEmail
} from 'class-validator'

import { VoltageEnum } from '../../enum/Voltage.enum'
import { CreateBuyerAddressDto } from './createBuyerAddress.dto'
import { CreateBuyerLineFamily } from './createBuyerLineFamily.dto'

const required = { required: true }

export class CreateBuyerDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  imageId: number

  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  @ApiProperty(required)
  cpf: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  category: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  clientTotvsCode: number

  @IsEnum(VoltageEnum)
  @IsOptional()
  @ApiProperty({ enum: VoltageEnum })
  voltage: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  role: string

  @IsOptional()
  @IsString()
  @Length(5, 5)
  @ApiProperty()
  birthday: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty(required)
  email: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  telephone: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  regionalManagerDescription: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  responsibleCode: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  responsibleDescription: string

  @ValidateNested({ each: true })
  @Type(() => CreateBuyerAddressDto)
  @ApiProperty({ ...required, type: CreateBuyerAddressDto })
  parentCompanyAddress: CreateBuyerAddressDto

  @ValidateNested({ each: true })
  @Type(() => CreateBuyerAddressDto)
  @ApiProperty({ ...required, type: CreateBuyerAddressDto })
  buyerAddress: CreateBuyerAddressDto

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBuyerLineFamily)
  @ArrayMinSize(1)
  @ApiProperty({ ...required, type: CreateBuyerLineFamily, isArray: true })
  linesFamilies: CreateBuyerLineFamily[]
}
