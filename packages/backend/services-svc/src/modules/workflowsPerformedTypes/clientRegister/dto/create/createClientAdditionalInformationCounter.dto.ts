import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator'

import { CreateAdditionalInformationCounterValue } from './createAdditionalInformationCounterValue.dto'

export class CreateClientAdditionalInformationCounterDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  counter: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  counterPhone: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  counterCrc: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAdditionalInformationCounterValue)
  @ApiProperty({
    required: true,
    type: CreateAdditionalInformationCounterValue,
    isArray: true
  })
  values: CreateAdditionalInformationCounterValue[]
}
