import { ApiProperty } from '@nestjs/swagger'

import { WorkflowTaskInProgressDto } from '../../../../clients/dto/findDetails/workflowTaskInProgress.dto'
import { CreateClientRegisterDto } from '../create/createClientRegister.dto'

export class FindDetailsClientRegisterDto extends CreateClientRegisterDto {
  @ApiProperty()
  id: number

  @ApiProperty({ type: WorkflowTaskInProgressDto })
  workflowTaskInProgress: WorkflowTaskInProgressDto

  @ApiProperty()
  status: string
}
