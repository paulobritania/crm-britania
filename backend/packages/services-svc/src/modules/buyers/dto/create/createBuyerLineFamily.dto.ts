import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, Length, IsNotEmpty } from 'class-validator'

const required = { required: true }

export class CreateBuyerLineFamily {
  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  familyCode: string

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  @ApiProperty(required)
  familyDescription: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  lineCode: number

  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  @ApiProperty(required)
  lineDescription: string
}
