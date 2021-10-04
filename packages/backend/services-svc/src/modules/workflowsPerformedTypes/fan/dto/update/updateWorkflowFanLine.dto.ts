import { ApiProperty } from '@nestjs/swagger'

import { CreateWorkflowFanLineDto } from '../create/createWorkflowFanLine.dto'

export class UpdateWorkflowFanLineDto extends CreateWorkflowFanLineDto {
  @ApiProperty()
  id: number
}
