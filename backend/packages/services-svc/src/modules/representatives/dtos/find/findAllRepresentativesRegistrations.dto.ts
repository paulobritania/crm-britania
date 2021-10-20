import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator'

import { OrderedAndPagedQueryDto } from '../../../../utils/pagination/orderedQuery.dto'
import { RepresentativeOrderByEnum } from '../../enum/representativeOrderBy.enum'
import { StatusEnum } from '../../enum/status.enum'

const isOptional = { required: false }
export class FindAllRepresentativesRegistrationsDto extends OrderedAndPagedQueryDto<RepresentativeOrderByEnum> {
  @IsString()
  @IsOptional()
  @MaxLength(14)
  @ApiProperty(isOptional)
  cnpj: string

  @IsString()
  @IsOptional()
  @ApiProperty(isOptional)
  companyName: string

  @IsEnum(StatusEnum)
  @IsOptional()
  @ApiProperty({ ...isOptional, enum: StatusEnum})
  status: StatusEnum

  @IsOptional()
  @IsEnum(RepresentativeOrderByEnum)
  @ApiProperty({ ...isOptional, enum: RepresentativeOrderByEnum })
  orderBy: RepresentativeOrderByEnum
}
