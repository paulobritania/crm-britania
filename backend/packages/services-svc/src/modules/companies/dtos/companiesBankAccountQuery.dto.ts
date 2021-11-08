import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'

import { PagedQuery } from '../../../utils/pagination/pagedQuery.dto'

export class CompaniesBankAccountQueryDto extends PagedQuery {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  id: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  companyId: number

  @IsString()
  @IsOptional()
  @Length(3, 3)
  @ApiProperty({ required: false })
  bankCode: string

  @IsString()
  @IsOptional()
  @Length(0, 10)
  @ApiProperty({ required: false })
  agency: string

  @IsString()
  @IsOptional()
  @Length(0, 10)
  @ApiProperty({ required: false })
  account: string

  @IsString()
  @IsOptional()
  @Length(0, 500)
  @ApiProperty({ required: false })
  note: string
}
