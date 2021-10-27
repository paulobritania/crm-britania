import { ApiProperty } from '@nestjs/swagger'

import { CreateWorkflowFanLineExceptionDto } from '../create/createWorkflowFanLineException.dto'

export class UpdateWorkflowFanLineExceptionDto extends CreateWorkflowFanLineExceptionDto {
  @ApiProperty()
  id: number
}
