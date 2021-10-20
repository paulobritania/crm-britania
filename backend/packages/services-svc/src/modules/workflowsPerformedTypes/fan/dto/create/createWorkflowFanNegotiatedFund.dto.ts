import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean
} from 'class-validator'

import { BasisOfCalculationEnum } from '../../enum/basisOfCalculation.enum'
import { DeterminationBasisEnum } from '../../enum/determinationBasis.enum'
import { DiscountEnum } from '../../enum/discount.enum'
import { PeriodicityEnum } from '../../enum/periodicityEnum.enum'

const required = { required: true }

export class CreateWorkflowFanNegotiatedFundDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  value: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string

  @IsEnum(PeriodicityEnum)
  @IsNotEmpty()
  @ApiProperty({ enum: PeriodicityEnum })
  periodicity: string

  @IsEnum(DiscountEnum)
  @IsNotEmpty()
  @ApiProperty({ enum: DiscountEnum })
  discount: string

  @IsEnum(DeterminationBasisEnum)
  @IsNotEmpty()
  @ApiProperty({ ...required, enum: DeterminationBasisEnum })
  determinationBasis: string

  @IsEnum(BasisOfCalculationEnum)
  @IsNotEmpty()
  @ApiProperty({ enum: BasisOfCalculationEnum })
  basisOfCalculation: string

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  slaughterReturn: boolean
}
