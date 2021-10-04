import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional } from 'class-validator'

import { CreateWorkflowNdDto } from '../create/createWorkflowVcpNd.dto'

export class updateWorkflowVpcNd extends CreateWorkflowNdDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id: number
}
