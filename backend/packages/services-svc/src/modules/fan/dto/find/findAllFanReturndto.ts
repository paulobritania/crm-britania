import { ApiProperty } from '@nestjs/swagger'

export class FindAllFanReturnDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  company: string

  @ApiProperty()
  parentCompanyName: string

  @ApiProperty()
  representative: string

  @ApiProperty()
  regionalManager: string

  @ApiProperty()
  directorship: string

  @ApiProperty()
  startDate: string

  @ApiProperty()
  endDate: string
}
