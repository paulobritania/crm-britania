import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, Length, IsNotEmpty, IsOptional } from 'class-validator'

const required = { required: true }

export class CreateBuyerLineFamily {
  @IsOptional()
  @IsString()
  @Length(0, 12)
  @IsNotEmpty()
  @ApiProperty()
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  responsibleCode: number

  @IsString()
  @Length(3, 70)
  @IsNotEmpty()
  @ApiProperty(required)
  responsibleDescription: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  buyerId: number

}
