import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'

import { PagedQuery } from '../../../utils/pagination/pagedQuery.dto'

export class CompaniesBankAccountDto extends PagedQuery {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  id: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  companyCode: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  bankCode: number

  @IsString()
  @IsOptional()
  @Length(9, 10)
  @ApiProperty({ required: false })
  agency: string

  @IsString()
  @IsOptional()
  @Length(9, 10)
  @ApiProperty({ required: false })
  account: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  note: string
}
