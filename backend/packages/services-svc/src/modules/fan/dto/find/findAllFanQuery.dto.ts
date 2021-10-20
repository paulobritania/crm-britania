import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator'

import { OrderedAndPagedQueryDto } from '../../../../utils/pagination/orderedQuery.dto'
import { CompanyFilterEnum } from '../../enum/companyFilter.enum'
import { FanOrderByOptionsEnum } from '../../enum/fanOrderByOption.enum'

const notRequired = { required: false }

export class FindAllFanQueryDto extends OrderedAndPagedQueryDto<FanOrderByOptionsEnum> {
  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  number: string

  @IsEnum(CompanyFilterEnum)
  @IsNotEmpty()
  @ApiProperty({ enum: CompanyFilterEnum })
  company: CompanyFilterEnum

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  parentCompanyName: string

  @IsOptional()
  @IsString()
  @ApiProperty(notRequired)
  representative: string

  @IsEnum(FanOrderByOptionsEnum)
  @IsOptional()
  @ApiProperty({ enum: FanOrderByOptionsEnum, required: false })
  orderBy: FanOrderByOptionsEnum
}
