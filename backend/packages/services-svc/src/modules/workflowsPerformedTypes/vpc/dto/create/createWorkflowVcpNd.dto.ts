import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDateString,
  IsBoolean,
  IsOptional
} from 'class-validator'

import { CompanyEnum } from '../../enum/company.enum'

const required = { required: true }
export class CreateWorkflowNdDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(required)
  issuerCompanyCode: number

  @IsString()
  @IsNotEmpty()
  @ApiProperty(required)
  issuerCompanyName: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  number: string

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  issueDate: Date

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  dueDate: Date

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  value: number

  @IsOptional()
  @IsString()
  @ApiProperty(required)
  company: string

  @IsOptional()
  @IsString()
  @ApiProperty({ enum: CompanyEnum })
  observation: string

  @IsBoolean()
  @ApiProperty(required)
  active: boolean

  @IsOptional()
  @IsString()
  @ApiProperty()
  reasonDeactivation: string
}
