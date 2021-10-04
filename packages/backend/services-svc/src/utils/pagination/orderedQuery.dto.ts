/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'

import { OrderBySortEnum } from './orderByDirection.enum'
import { PagedQuery } from './pagedQuery.dto'

export abstract class OrderedAndPagedQueryDto<T> extends PagedQuery {
  abstract orderBy: T

  @IsEnum(OrderBySortEnum)
  @IsOptional()
  @ApiProperty({ required: false, enum: OrderBySortEnum })
  sort: OrderBySortEnum
}

export abstract class OrderedQueryDto<T> {
  abstract orderBy: T

  @IsEnum(OrderBySortEnum)
  @IsOptional()
  @ApiProperty({ required: false, enum: OrderBySortEnum })
  sort: OrderBySortEnum
}
