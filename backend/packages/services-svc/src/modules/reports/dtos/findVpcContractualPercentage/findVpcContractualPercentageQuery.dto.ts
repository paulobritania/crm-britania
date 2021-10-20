import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from 'class-validator'

import { IsStringifiedNumberArray } from '../../../../utils/validations/isStringifiedNumberArrayValidator'

export class FindVpcContractualPercentageQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  lineCode: number

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  regionalCode: number

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  responsibleCode: number

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @Validate(IsStringifiedNumberArray)
  @ApiProperty({ required: true, description: 'Parent company codes separated by comma (,)' })
  parentCompanyCodes: string

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  startDate: string

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  endDate: string
}
