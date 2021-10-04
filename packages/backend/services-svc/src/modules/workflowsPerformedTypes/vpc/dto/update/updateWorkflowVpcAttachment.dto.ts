import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

import { CreateWorkflowVpcAttachmentDto } from '../create/createWorkflowVpcAttachment.dto'

export class UpdateWorkflowAttachemntDto extends CreateWorkflowVpcAttachmentDto {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  id?: number
}
