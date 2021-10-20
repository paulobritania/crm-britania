import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

import { OrderedAndPagedQueryDto } from '../../../../utils/pagination/orderedQuery.dto'
import { GetProductsOrderByOptionsEnum } from '../../enums/getProductsOrderByOptions.enum'

export class GetProductsQueryDto extends OrderedAndPagedQueryDto<GetProductsOrderByOptionsEnum> {
  @IsEnum(GetProductsOrderByOptionsEnum)
  @IsOptional()
  @ApiProperty({ required: false, enum: GetProductsOrderByOptionsEnum })
  orderBy: GetProductsOrderByOptionsEnum

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  productCode: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  productDescription: string

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  lineMasterCode: number

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  lineCode: number

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  materialFamilyCode: number

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  commercialProductCode: number

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  stockGroupCode: number
}
