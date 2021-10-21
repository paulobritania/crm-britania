import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsNumber,
  IsString,
  IsDateString,
  ValidateNested,
  IsArray,
  IsOptional
} from 'class-validator'

import { FoundsTypeEnum } from '../../enum/foundsType.enum'
import { PaymentTypeEnum } from '../../enum/paymentType.enum'
import { UpdateWorkflowAttachemntDto } from './updateWorkflowVpcAttachment.dto'
import { UpdateWorkflowVpcLineFamilyDto } from './updateWorkflowVpcLineFamily.dto'
import { updateWorkflowVpcNd } from './updateWorkflowVpcNd.dto'
import { UpdateWorkflowVpcProductDto } from './updateWorkflowVpcProduct.dto'
import { UpdateWorkflowVpcRequestDto } from './updateWorkflowVpcRequest.dto'

export class UpdateWorkflowVpcDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  cnpj: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  parentCompanyCode: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  parentCompanyName: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  companyName: string

  @IsOptional()
  @IsString()
  @ApiProperty({ enum: FoundsTypeEnum })
  foundsType: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  trandingNumber: number

  @IsOptional()
  @IsString()
  @ApiProperty({ enum: PaymentTypeEnum })
  paymentType: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  requestNumber?: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  value: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  campaignReason: string

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  startDate: Date

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  endDate: Date

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  directorshipCode: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  directorshipDescription: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  approverCode: number

  @IsOptional()
  @IsString()
  @ApiProperty()
  approverDescription: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  bank: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  bankAgency: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  bankAccount: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  bankCnpj: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkflowVpcLineFamilyDto)
  @ApiProperty({
    required: true,
    type: UpdateWorkflowVpcLineFamilyDto,
    isArray: true
  })
  linesFamilies: UpdateWorkflowVpcLineFamilyDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkflowAttachemntDto)
  @ApiProperty({
    required: true,
    type: UpdateWorkflowAttachemntDto,
    isArray: true
  })
  attachments: UpdateWorkflowAttachemntDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkflowVpcRequestDto)
  @ApiProperty({
    required: true,
    type: UpdateWorkflowVpcRequestDto,
    isArray: true
  })
  requests: UpdateWorkflowVpcRequestDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkflowVpcProductDto)
  @ApiProperty({
    required: true,
    type: UpdateWorkflowVpcProductDto,
    isArray: true
  })
  products: UpdateWorkflowVpcProductDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => updateWorkflowVpcNd)
  @ApiProperty({
    required: true,
    type: updateWorkflowVpcNd,
    isArray: true
  })
  nds: updateWorkflowVpcNd[]
}
