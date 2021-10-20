import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

import { CreateWorkflowVpcLineFamilyDto } from '../create/createWorkflowVpcLineFamily.dto'

export class UpdateWorkflowVpcLineFamilyDto extends CreateWorkflowVpcLineFamilyDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id?: number
}
