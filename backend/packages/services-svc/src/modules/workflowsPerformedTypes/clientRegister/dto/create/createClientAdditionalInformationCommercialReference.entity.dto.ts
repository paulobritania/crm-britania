import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

const required = { required: true }

export class CreateClientAdditionalInformationCommercialReferenceDto {
  id: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  suframa: string

  @IsString()
  @ApiProperty(required)
  name: string

  @IsString()
  @ApiProperty(required)
  phone: string
}
