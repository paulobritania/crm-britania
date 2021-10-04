import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumberString, IsOptional } from 'class-validator'

import { PagedQuery } from '../../../../utils/pagination/pagedQuery.dto'

const notRequired = { required: false }

export class ClientQueryDescriptionDto extends PagedQuery {
  @IsNumberString()
  @IsOptional()
  @ApiProperty(notRequired)
  parentCompanyCode: string

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  parentCompany: string

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  cnpj: string

  @IsString()
  @IsOptional()
  @ApiProperty(notRequired)
  companyName: string
}
