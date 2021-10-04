import { ApiProperty } from '@nestjs/swagger'

import { CreateWorkflowFanNegotiatedFundDto } from '../create/createWorkflowFanNegotiatedFund.dto'

export class UpdateWorkflowFanNegotiatedFundDto extends CreateWorkflowFanNegotiatedFundDto {
  @ApiProperty()
  id: number
}
