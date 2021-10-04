import { ApiProperty } from '@nestjs/swagger'

export class VpcContractualPercentageDto {
  @ApiProperty()
  clientCode: number

  @ApiProperty()
  clientName: string

  @ApiProperty()
  budgetContractCode: number

  @ApiProperty()
  budgetContractName: string

  @ApiProperty()
  lineCode: number

  @ApiProperty()
  lineName: string

  @ApiProperty()
  contractType: string

  @ApiProperty()
  value: number

  @ApiProperty()
  contractualPercentage: number
}
