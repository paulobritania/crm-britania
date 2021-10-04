import { ApiProperty } from '@nestjs/swagger'
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean
} from 'class-validator'

import { BasisOfCalculationEnum } from '../../enum/basisOfCalculation.enum'
import { DeterminationBasisEnum } from '../../enum/determinationBasis.enum'
import { PeriodicityEnum } from '../../enum/periodicityEnum.enum'

const required = { required: true }

export class CreateWorkflowFanGoalAchivementDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  startPercentage: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  endPercentage: number

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  bonus: number

  @IsEnum(PeriodicityEnum)
  @IsNotEmpty()
  @ApiProperty({ enum: PeriodicityEnum })
  periodicity: string

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
