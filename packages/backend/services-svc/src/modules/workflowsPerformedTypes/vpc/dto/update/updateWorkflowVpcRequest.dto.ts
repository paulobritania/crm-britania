import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

import { CreateWorkflowVpcRequestDto } from '../create/createWorkflowVpcRequest.dto'

export class UpdateWorkflowVpcRequestDto extends CreateWorkflowVpcRequestDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id?: number
}
