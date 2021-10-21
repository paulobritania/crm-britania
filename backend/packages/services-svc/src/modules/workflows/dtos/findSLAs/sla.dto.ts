import { ApiProperty } from '@nestjs/swagger'

import { SlaExpirationIndicatorEnum } from '../../enum/slaExpirationTime.enum'

export class SlaDto {
  @ApiProperty({ enum: SlaExpirationIndicatorEnum })
  expirationTime: SlaExpirationIndicatorEnum

  @ApiProperty()
  dueDate: string

  @ApiProperty()
  workflowType: string

  @ApiProperty()
  workflowTypeAlias: string

  @ApiProperty()
  workflowIdentifier: number

  @ApiProperty()
  taskName: string

  @ApiProperty()
  parentCompanyName: string
}
