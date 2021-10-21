import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator'

import { IsStringifiedNumberArray } from '../../../../utils/validations/isStringifiedNumberArrayValidator'


export class FindAllLinesQueryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string

  @IsString()
  @IsOptional()
  @Validate(IsStringifiedNumberArray)
  @ApiProperty({
    required: false,
    description: 'Line master codes separated by comma (,)'
  })
  lineMasterCode?: string

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  clientTotvsCode?: number
}
