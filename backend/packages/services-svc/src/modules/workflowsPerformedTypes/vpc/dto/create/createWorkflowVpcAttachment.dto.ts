import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional } from 'class-validator'

export class CreateWorkflowVpcAttachmentDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  description: string

  @IsNumber()
  @ApiProperty({ required: true })
  fileId: number
}
