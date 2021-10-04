import { ApiProperty } from '@nestjs/swagger'

export class PriceListQueryDto {
  @ApiProperty({ required: false })
  page: number

  @ApiProperty({ required: false })
  pageSize: number

  @ApiProperty({ required: false })
  description: string
}
