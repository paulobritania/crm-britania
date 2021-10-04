import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, MaxLength } from 'class-validator'

const required = { required: true }

export class CreateClientAdditionalInformationBankReferenceDto {
  id: number

  @IsString()
  @ApiProperty(required)
  name: string

  @MaxLength(4)
  @IsString()
  @ApiProperty(required)
  agency: string

  @IsOptional()
  @IsString()
  @ApiProperty(required)
  account: string

  @IsString()
  @ApiProperty(required)
  phone: string
}
