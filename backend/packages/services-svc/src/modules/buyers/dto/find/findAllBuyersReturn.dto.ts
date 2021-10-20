// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger'

class BuyerLines {
  @ApiProperty()
  lineDescription: string

  @ApiProperty()
  lineCode: number
}

export class FindAllBuyerReturnDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  matrixCompany: string

  @ApiProperty()
  name: string

  @ApiProperty()
  regionalDescription: string

  @ApiProperty()
  responsible: string

  @ApiProperty()
  active: boolean

  @ApiProperty()
  buyerLinesFamilies: BuyerLines[]
}
