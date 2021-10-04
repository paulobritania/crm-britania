import { ApiProperty } from '@nestjs/swagger'

export class VpcFundsControlDto {
  @ApiProperty()
  billing: number

  @ApiProperty()
  regional: string

  @ApiProperty()
  credit: number

  @ApiProperty()
  returnCancellation: number

  @ApiProperty()
  moneyConsumed: number

  @ApiProperty()
  percentageConsumed: number

  @ApiProperty()
  availableFunds: number

  @ApiProperty()
  inProgress: number

  @ApiProperty()
  percentageInProgress: number

  @ApiProperty()
  newRequest: number

  @ApiProperty()
  percentageNewRequest: number

  @ApiProperty()
  percentageTotalYear: number

  @ApiProperty()
  balanceYear: number

  @ApiProperty({ type: VpcFundsControlDto, isArray: true })
  children: VpcFundsControlDto[]
}

export class VpcFundsControlTotalizerDto {
  @ApiProperty()
  billing: number

  @ApiProperty()
  credit: number

  @ApiProperty()
  returnCancellation: number

  @ApiProperty()
  moneyConsumed: number

  @ApiProperty()
  inProgress: number

  @ApiProperty()
  newRequest: number

  @ApiProperty()
  balanceYear: number

  @ApiProperty()
  percentageConsumed: number

  @ApiProperty()
  availableFunds: number

  @ApiProperty()
  percentageNewRequest: number

  @ApiProperty()
  percentageTotalYear: number

  @ApiProperty()
  percentageInProgress: number
}

export class VpcFundsControlResponseDto {
  @ApiProperty({ type: VpcFundsControlDto, isArray: true })
  items: VpcFundsControlDto[]

  @ApiProperty({ type: VpcFundsControlTotalizerDto })
  total: VpcFundsControlTotalizerDto
}
