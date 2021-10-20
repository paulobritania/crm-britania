import { ApiProperty } from '@nestjs/swagger'

export class FindBranchesDto {
  @ApiProperty()
  branchName: string

  @ApiProperty()
  branchCode: number

  @ApiProperty()
  state: string

  @ApiProperty()
  city: string

  @ApiProperty()
  cdCode: string

  @ApiProperty()
  creditSituation: string

  @ApiProperty()
  daysWithoutBilling: number

  @ApiProperty()
  active: boolean

}
