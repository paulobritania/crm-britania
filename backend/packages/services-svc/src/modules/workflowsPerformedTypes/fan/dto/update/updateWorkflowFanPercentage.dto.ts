import { ApiProperty } from '@nestjs/swagger'

import { CreateWorkflowFanPercentageDto } from '../create/createWorkflowFanPercentage.dto'

export class UpdatereateWorkflowFanPercentageDto extends CreateWorkflowFanPercentageDto {
  @ApiProperty()
  id: number
}
