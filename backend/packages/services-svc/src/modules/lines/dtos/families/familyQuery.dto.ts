import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Validate
} from 'class-validator'

import { IsStringifiedNumberArray } from '../../../../utils/validations/isStringifiedNumberArrayValidator'

export class FamilyQueryDto {
  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  code?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  clientTotvsCode?: number

  @IsString()
  @IsNumber()
  @IsOptional()
  @Validate(IsStringifiedNumberArray)
  @ApiProperty({
    required: false,
    description: 'Line master codes separated by comma (,)'
  })
  lineMasterCodes?: string

  @IsString()
  @IsOptional()
  @Validate(IsStringifiedNumberArray)
  @ApiProperty({
    required: false,
    description: 'Line codes separated by comma (,)'
  })
  lines?: string
}
