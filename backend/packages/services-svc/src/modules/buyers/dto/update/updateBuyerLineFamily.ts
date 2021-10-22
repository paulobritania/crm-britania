import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'
import { CreateBuyerDto } from '../create/createBuyer.dto'

import { CreateBuyerLineFamily } from '../create/createBuyerLineFamily.dto'

const required = { required: true }
export class UpdateBuyerLineFamily extends CreateBuyerLineFamily {
  @IsString()
  @Length(12, 12)
  @IsNotEmpty()
  @ApiProperty(required)
  familyCode: string

  @IsString()
  @Length(3, 200)
  @IsNotEmpty()
  @ApiProperty(required)
  familyDescription: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  lineCode: number

  @IsString()
  @Length(3, 200)
  @IsNotEmpty()
  @ApiProperty(required)
  lineDescription: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  regionalManagerCode: number

  @IsString()
  @Length(3, 70)
  @IsNotEmpty()
  @ApiProperty(required)
  regionalManagerDescription: string

  @IsDate()
  @IsNotEmpty()
  @ApiProperty(required)
  updatedAt: Date

  @Type(() => CreateBuyerDto)
  @ApiProperty({ ...required, type: CreateBuyerDto })
  buyer: CreateBuyerDto

}
