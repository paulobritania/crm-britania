import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

import { CreateWorkflowProductDto } from '../create/createWorkflowVpcProduct.dto'

export class UpdateWorkflowVpcProductDto extends CreateWorkflowProductDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id?: number
}
