import { ApiProperty } from '@nestjs/swagger'

export class FindDetailsContractPercentageDto {
  @ApiProperty()
  percentual: number

  @ApiProperty()
  number: number

  @ApiProperty()
  name: string

  @ApiProperty()
  line: string

  @ApiProperty()
  lineCode: number

  @ApiProperty()
  family: string

  @ApiProperty()
  familyCode: number

  @ApiProperty()
  periodicity: string

  @ApiProperty()
  startDate: string

  @ApiProperty()
  endDate: string

  @ApiProperty()
  status: boolean
}
