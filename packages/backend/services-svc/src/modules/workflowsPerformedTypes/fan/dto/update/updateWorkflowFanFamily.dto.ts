import { ApiProperty } from '@nestjs/swagger'

import { CreateWorkflowFanFamilyDto } from '../create/createWorkflowFanFamily.dto'

export class UpdateWorkflowFanFamilyDto extends CreateWorkflowFanFamilyDto {
  @ApiProperty()
  id: number
}
