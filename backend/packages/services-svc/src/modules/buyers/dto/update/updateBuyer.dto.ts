import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
  IsBoolean
} from 'class-validator'

import { VoltageEnum } from '../../enum/Voltage.enum'
import { CreateBuyerAddressDto } from '../create/createBuyerAddress.dto'
import { CreateBuyerLineFamily } from '../create/createBuyerLineFamily.dto'
import { UpdateBuyerLineFamily } from './updateBuyerLineFamily'

const required = { required: true }

export class UpdateBuyerDto {
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

  @IsString()
  @IsOptional()
  @Length(3)
  @ApiProperty({ enum: VoltageEnum })
  voltage: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  role: string

  @IsString()
  @IsOptional()
  @Length(5, 5)
  @ApiProperty()
  birthday: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  email: string

  @IsString()
  @IsOptional()
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

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  active: boolean

  @Type(() => CreateBuyerAddressDto)
  @ApiProperty({ ...required, type: CreateBuyerAddressDto })
  parentCompanyAddress: CreateBuyerAddressDto

  @Type(() => CreateBuyerAddressDto)
  @ApiProperty({ ...required, type: CreateBuyerAddressDto })
  buyerAddress: CreateBuyerAddressDto

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBuyerLineFamily)
  @ApiProperty({ required: false, type: CreateBuyerLineFamily, isArray: true })
  linesFamilies: UpdateBuyerLineFamily[]
}
