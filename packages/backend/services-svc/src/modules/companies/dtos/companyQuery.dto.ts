import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'

import { OrderedAndPagedQueryDto } from '../../../utils/pagination/orderedQuery.dto'
import { CompaniesOrderByOptionsEnum } from '../enum/companiesOrderByOptions.enum'


export class CompanyQueryDto extends OrderedAndPagedQueryDto<CompaniesOrderByOptionsEnum> {
  @IsEnum(CompaniesOrderByOptionsEnum)
  @IsOptional()
  @ApiProperty({ required: false, enum: CompaniesOrderByOptionsEnum })
  orderBy: CompaniesOrderByOptionsEnum
}
