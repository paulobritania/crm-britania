import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested
} from 'class-validator'

import { UpdateClientAddressDto } from './updateClientAddress.dto'

const required = { required: true }
const notRequired = { required: false }

export class UpdateClientDto {
  @ApiProperty(required)
  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  @Matches(/^[0-9]*$/, {
    message: 'commercialPhone must have only numbers'
  })
  commercialPhone: string

  @ApiProperty(notRequired)
  @IsString()
  @IsOptional()
  @MaxLength(11)
  @Matches(/^[0-9]*$/, { message: 'cellPhone must have only numbers' })
  cellPhone: string

  @ApiProperty(notRequired)
  @IsString()
  @IsOptional()
  @MaxLength(40)
  logisticsInformation: string

  @ApiProperty(notRequired)
  @IsString()
  @IsOptional()
  @MaxLength(40)
  creditSituation: string

  @ApiProperty(notRequired)
  @IsString()
  @IsOptional()
  @MaxLength(40)
  regimeLetter: string

  @ApiProperty(notRequired)
  @IsNumber()
  @IsOptional()
  daysWithoutBilling: number

  @ApiProperty({ ...required, type: UpdateClientAddressDto })
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateClientAddressDto)
  deliveryAddress: UpdateClientAddressDto

  @ApiProperty({ ...required, type: UpdateClientAddressDto })
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateClientAddressDto)
  billingAddress: UpdateClientAddressDto
}
