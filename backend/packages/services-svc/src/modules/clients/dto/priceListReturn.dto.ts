import { ApiProperty } from '@nestjs/swagger'

export class PriceListReturnDto {
  @ApiProperty()
  codePriceList: string

  @ApiProperty()
  namePriceList: string
}
