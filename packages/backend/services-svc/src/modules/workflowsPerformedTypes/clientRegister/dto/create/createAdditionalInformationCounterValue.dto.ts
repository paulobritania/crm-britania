import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, IsOptional } from 'class-validator'

export class CreateAdditionalInformationCounterValue {
  id: number

  @IsNumber()
  @ApiProperty({ required: true })
  value: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  localization: string
}
