import { ApiProperty } from '@nestjs/swagger'

export class UnidentifiedFoundsDto {
  @ApiProperty()
  companyCode: number

  @ApiProperty()
  companyName: string

  @ApiProperty()
  totalValue: number
}
