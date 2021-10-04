/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'

import { CreateWorkflowFanDto } from '../../../workflowsPerformedTypes/fan/dto/create/createWorkflowFan.dto'
import { FanDocumentDto } from '../../../workflowsPerformedTypes/fan/dto/create/createWorkflowFanDocument.dto'

class FanDocumentVersion extends FanDocumentDto {
  @ApiProperty()
  version: number
}
class Fan extends CreateWorkflowFanDto {
  @ApiProperty({ type: FanDocumentVersion, isArray: true })
  documents: FanDocumentVersion[]
}
export class FindOneFanReturnDto {
  @ApiProperty({ type: Fan })
  fan: Fan

  @ApiProperty({ type: Fan })
  lastFan: Fan
}
