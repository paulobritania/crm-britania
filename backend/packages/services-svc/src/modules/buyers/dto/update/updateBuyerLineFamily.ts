import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

import { CreateBuyerLineFamily } from '../create/createBuyerLineFamily.dto'

export class UpdateBuyerLineFamily extends CreateBuyerLineFamily {
  @IsNumber()
  @ApiProperty({ required: false })
  id?: number
}
