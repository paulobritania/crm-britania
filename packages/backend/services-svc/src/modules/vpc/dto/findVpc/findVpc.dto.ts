import { ApiProperty } from '@nestjs/swagger'

import { WorkflowTaskInProgressDto } from '../../../clients/dto/findDetails/workflowTaskInProgress.dto'
import { WorkflowNdDto } from './workflowNd.dto'
import { WorkflowProductDto } from './workflowProduct.dto'
import { WorkflowVpcAttachmentDto } from './workflowVpcAttachment.dto'
import { WorkflowVpcLineFamilyDto } from './workflowVpcLineFamily.dto'

export class FindVpcDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  cnpj: string

  @ApiProperty()
  parentCompanyCode: number

  @ApiProperty()
  parentCompanyName: string

  @ApiProperty()
  companyName: string

  @ApiProperty()
  foundsType: string

  @ApiProperty()
  trandingNumber: number

  @ApiProperty()
  paymentType: string

  @ApiProperty()
  requestNumber: string

  @ApiProperty()
  active: boolean

  @ApiProperty()
  deploymentDate: Date

  @ApiProperty()
  value: number

  @ApiProperty()
  campaignReason: string

  @ApiProperty()
  startDate: Date

  @ApiProperty()
  endDate: Date

  @ApiProperty()
  directorshipCode: number

  @ApiProperty()
  directorshipDescription: string

  @ApiProperty()
  approverCode: number

  @ApiProperty()
  approverDescription: string

  @ApiProperty()
  bank: string

  @ApiProperty()
  bankAgency: string

  @ApiProperty()
  bankAccount: string

  @ApiProperty()
  bankCnpj: string

  @ApiProperty()
  workflowPerformedId: number

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  createdBy: number

  @ApiProperty()
  updatedBy: number

  @ApiProperty()
  linesFamilies: WorkflowVpcLineFamilyDto[]

  @ApiProperty()
  nds: WorkflowNdDto[]

  @ApiProperty()
  products: WorkflowProductDto[]

  @ApiProperty()
  attachments: WorkflowVpcAttachmentDto[]

  @ApiProperty()
  workflowTaskInProgress: WorkflowTaskInProgressDto

  @ApiProperty()
  situation: string
}
