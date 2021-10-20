import { ApiProperty } from '@nestjs/swagger'

import { ClientRankingDetailsDto } from './clientRankingDetails.dto'
import { FindDetailsAddressDto } from './findDetailsAddress.dto'
import { FindDetailsContractPercentageDto } from './findDetailsContractPercentage.dto'
import { FindDetailsMainDataDto } from './findDetailsMainData.dto'
import { WorkflowTaskInProgressDto } from './workflowTaskInProgress.dto'

export class FindDetailsDto {
  @ApiProperty({ type: FindDetailsMainDataDto })
  mainData: FindDetailsMainDataDto

  @ApiProperty({ type: FindDetailsContractPercentageDto })
  contractPercentage?: FindDetailsContractPercentageDto[]

  @ApiProperty({ type: FindDetailsAddressDto })
  deliveryAddress: FindDetailsAddressDto

  @ApiProperty({ type: FindDetailsAddressDto })
  billingAddress: FindDetailsAddressDto

  @ApiProperty({ type: WorkflowTaskInProgressDto })
  workflowTaskInProgress?: WorkflowTaskInProgressDto

  @ApiProperty({ type: ClientRankingDetailsDto })
  rankingDetails?: ClientRankingDetailsDto
}
