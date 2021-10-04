import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsBoolean
} from 'class-validator'

import { BasisOfCalculationEnum } from '../../enum/basisOfCalculation.enum'
import { DeterminationBasisEnum } from '../../enum/determinationBasis.enum'
import { DiscountEnum } from '../../enum/discount.enum'
import { PeriodicityEnum } from '../../enum/periodicityEnum.enum'

const required = { required: true }

export class CreateWorkflowFanPercentageDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  percentage: number

  @IsEnum(DeterminationBasisEnum)
  @IsNotEmpty()
  @ApiProperty({ ...required, enum: DeterminationBasisEnum })
  determinationBasis: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  budgetDescription: string

  @IsEnum(PeriodicityEnum)
  @IsNotEmpty()
  @ApiProperty({ ...required, enum: PeriodicityEnum })
  periodicity: string

  @IsEnum(DiscountEnum)
  @IsNotEmpty()
  @ApiProperty({ ...required, enum: DiscountEnum })
  discount: string

  @IsEnum(BasisOfCalculationEnum)
  @IsNotEmpty()
  @ApiProperty({ ...required, enum: BasisOfCalculationEnum })
  basisOfCalculation: string

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ ...required })
  slaughterReturn: boolean
}
