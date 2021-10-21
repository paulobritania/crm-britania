import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

import { PagedQuery } from '../../../utils/pagination/pagedQuery.dto'

export class BanksQueryDto extends PagedQuery {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description: string
}
