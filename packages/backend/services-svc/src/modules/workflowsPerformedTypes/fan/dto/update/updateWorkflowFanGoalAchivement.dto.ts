import { ApiProperty } from '@nestjs/swagger'

import { CreateWorkflowFanGoalAchivementDto } from '../create/createWorkflowFanGoalAchivement.dto'

export class UpdateWorkflowFanGoalAchivementDto extends CreateWorkflowFanGoalAchivementDto {
  @ApiProperty()
  id: number
}
