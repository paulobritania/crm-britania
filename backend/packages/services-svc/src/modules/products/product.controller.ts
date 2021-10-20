import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'

import { BritaniaAuth, JwtAuthGuard } from '@britania-crm-com/auth-utils'

import { PagedApiResponse } from '../../utils/pagination/pagedApiResponse.dto'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { ProductDescriptionDto } from './dtos/getProductDescriptions/productDescription.dto'
import { ProductDetailsDto } from './dtos/getProductDetails/productDetails.dto'
import { GetProductsQueryDto } from './dtos/getProducts/getProductsQuery.dto'
import { ProductDto } from './dtos/getProducts/product.dto'
import { ProductService } from './product.service'

@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Products')
@ApiExtraModels(PagedResult, ProductDto, ProductDescriptionDto)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @PagedApiResponse(ProductDto, 'Paged list of products')
  @Get()
  getProducts(
    @Query() query: GetProductsQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<PagedResult<ProductDto>> {
    return this.productService.getProducts(query, tokenBritania)
  }

  @PagedApiResponse(ProductDescriptionDto, 'Paged list of product descriptions')
  @Get('descriptions')
  getProductDescriptions(
    @Query() query: GetProductsQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<PagedResult<ProductDescriptionDto>> {
    return this.productService.getProductDescriptions(query, tokenBritania)
  }

  @ApiOkResponse({
    status: 200,
    type: ProductDetailsDto,
    description: 'Product details'
  })
  @Get(':productCode')
  getProductDetails(
    @Param('productCode') productCode: string,
    @BritaniaAuth('tokenBritania') tokenBritania: string
  ): Promise<ProductDetailsDto> {
    return this.productService.getProductDetails(productCode, tokenBritania)
  }
}
