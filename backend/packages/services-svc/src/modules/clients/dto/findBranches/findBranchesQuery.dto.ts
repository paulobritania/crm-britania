import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsOptional
} from 'class-validator'

import { OrderedAndPagedQueryDto } from '../../../../utils/pagination/orderedQuery.dto'
import { BranchesOrderByEnum } from '../../enum/branchesOrderby.enum'

const fieldIsOptional = { required: false }
export class FindBranchesQueryDto extends OrderedAndPagedQueryDto<BranchesOrderByEnum> {
  @IsOptional()
  @IsEnum(BranchesOrderByEnum)
  @ApiProperty({ ...fieldIsOptional, enum: BranchesOrderByEnum })
  orderBy: BranchesOrderByEnum
}
