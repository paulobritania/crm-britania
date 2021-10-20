import { ApiProperty } from '@nestjs/swagger'

import { WorkflowTaskInProgressDto } from '../../../clients/dto/findDetails/workflowTaskInProgress.dto'
import { SaveRepresentativePreRegistrationDto } from '../preRegistration/saveRepresentativePreRegistration.dto'

export class FindOneRepresentativeRegistrationDto extends SaveRepresentativePreRegistrationDto {
  @ApiProperty()
  id: number

  @ApiProperty({ type: WorkflowTaskInProgressDto })
  workflowTaskInProgress: WorkflowTaskInProgressDto
}
