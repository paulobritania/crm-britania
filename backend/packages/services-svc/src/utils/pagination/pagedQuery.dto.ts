import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator'
import { FindOptions } from 'sequelize'

export class PagedQuery {
  @Type(() => Number)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  page: number

  @Type(() => Number)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  pageSize: number
}

export const convertToFindOptions = (
  page: number,
  pageSize: number
): FindOptions => {
  return {
    offset: (Number(page) - 1) * Number(pageSize),
    limit: Number(pageSize)
  }
}
