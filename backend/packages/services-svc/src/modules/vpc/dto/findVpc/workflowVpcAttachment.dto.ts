import { ApiProperty } from '@nestjs/swagger'

export class WorkflowVpcAttachmentDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  workflowVpcId: number

  @ApiProperty()
  description: string

  @ApiProperty({ required: true })
  fileId: number
}
