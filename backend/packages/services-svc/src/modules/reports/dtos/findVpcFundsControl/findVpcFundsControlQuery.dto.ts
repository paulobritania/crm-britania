import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate
} from 'class-validator'

import { IsStringifiedNumberArray } from '../../../../utils/validations/isStringifiedNumberArrayValidator'

const notRequired = { required: false }

export class FindVpcFundsControlQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty(notRequired)
  lineCode: number

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty(notRequired)
  regionalCode: number

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty(notRequired)
  responsibleCode: number

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @Validate(IsStringifiedNumberArray)
  @ApiProperty({
    required: true,
    description: 'Parent company codes separated by comma (,)'
  })
  parentCompanyCodes: string

  @IsDateString()
  @IsOptional()
  @ApiProperty(notRequired)
  startDate: string

  @IsDateString()
  @IsOptional()
  @ApiProperty(notRequired)
  endDate: string

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  @ApiProperty(notRequired)
  displayRevenues: boolean

  @Type(() => String)
  @IsString()
  @IsOptional()
  @Validate(IsStringifiedNumberArray)
  @ApiProperty({
    required: false,
    description: 'Tax codes separated by comma (,)'
  })
  taxCodes: string

  @Type(() => String)
  @IsString()
  @IsOptional()
  @Validate(IsStringifiedNumberArray)
  @ApiProperty({
    required: false,
    description: 'Fund codes separated by comma (,)'
  })
  fundTypes: string
}
