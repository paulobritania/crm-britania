import { ApiProperty } from '@nestjs/swagger'
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
  Validate
} from 'class-validator'

import { IsStringifiedNumberArray } from '../../../../utils/validations/isStringifiedNumberArrayValidator'

const notRequired = { required: false }

export class FindAllBuyersQueryDto {
  @IsNumberString()
  @IsOptional()
  @ApiProperty(notRequired)
  clientTotvsCode: number

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  name: string

  @IsBooleanString()
  @IsOptional()
  @ApiProperty(notRequired)
  active: boolean

  @Validate(IsStringifiedNumberArray)
  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  lineCodes: string

  @ApiProperty(notRequired)
  offset: string

  @ApiProperty(notRequired)
  limit: string
}
