import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString, IsOptional, IsString } from 'class-validator'

import { PagedQuery } from '../../../utils/pagination/pagedQuery.dto'

export class EstablishmentsQueryDto extends PagedQuery {
  @IsNumberString()
  @IsOptional()
  @ApiProperty({ required: false })
  code: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description: string
}
