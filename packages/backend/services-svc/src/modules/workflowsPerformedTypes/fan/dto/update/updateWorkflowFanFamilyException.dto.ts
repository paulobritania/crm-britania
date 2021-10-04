import { ApiProperty } from '@nestjs/swagger'

import { CreateWorkflowFanFamilyExceptionDto } from '../create/createWorkflowFanFamilyException.dto'

export class UpdateWorkflowFanFamilyExceptionDto extends CreateWorkflowFanFamilyExceptionDto {
  @ApiProperty()
  id: number
}
