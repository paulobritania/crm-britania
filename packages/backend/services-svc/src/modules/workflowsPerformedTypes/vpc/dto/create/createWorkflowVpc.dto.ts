import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsString,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsArray,
  IsOptional,
  ValidateIf
} from 'class-validator'

import { FoundsTypeEnum } from '../../enum/foundsType.enum'
import { PaymentTypeEnum } from '../../enum/paymentType.enum'
import { CreateWorkflowNdDto } from './createWorkflowVcpNd.dto'
import { CreateWorkflowVpcAttachmentDto } from './createWorkflowVpcAttachment.dto'
import { CreateWorkflowVpcLineFamilyDto } from './createWorkflowVpcLineFamily.dto'
import { CreateWorkflowProductDto } from './createWorkflowVpcProduct.dto'
import { CreateWorkflowVpcRequestDto } from './createWorkflowVpcRequest.dto'

export class CreateWorkflowVpcDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  @ValidateIf((o) => !o.parentCompanyName || o.cnpj)
  cnpj: string

  @IsNumber()
  @ApiProperty()
  @IsOptional()
  parentCompanyCode: number

  @IsString()
  @ApiProperty()
  @IsOptional()
  @ValidateIf((o) => !o.cnpj || o.parentCompanyName)
  parentCompanyName: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  requestNumber?: string

  @IsString()
  @ApiProperty()
  @IsOptional()
  companyName: string

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: FoundsTypeEnum })
  foundsType: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  trandingNumber: number

  @IsString()
  @IsOptional()
  @ApiProperty({ enum: PaymentTypeEnum })
  paymentType: string

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
  @Type(() => CreateWorkflowVpcLineFamilyDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowVpcLineFamilyDto,
    isArray: true
  })
  linesFamilies: CreateWorkflowVpcLineFamilyDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowNdDto)
  @ApiProperty({ required: false, type: CreateWorkflowNdDto, isArray: true })
  nds: CreateWorkflowNdDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowProductDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowProductDto,
    isArray: true
  })
  products: CreateWorkflowProductDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowVpcRequestDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowVpcRequestDto,
    isArray: true
  })
  requests: CreateWorkflowVpcRequestDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkflowVpcAttachmentDto)
  @ApiProperty({
    required: false,
    type: CreateWorkflowVpcAttachmentDto,
    isArray: true
  })
  attachments: CreateWorkflowVpcAttachmentDto[]
}
