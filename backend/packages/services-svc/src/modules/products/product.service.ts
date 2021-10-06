import {
  HttpService,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import * as qs from 'qs'

import { OrderBySortEnum } from '../../utils/pagination/orderByDirection.enum'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { ProductDescriptionDto } from './dtos/getProductDescriptions/productDescription.dto'
import { ProductDetailsDto } from './dtos/getProductDetails/productDetails.dto'
import { ProductDetailsResponseDto } from './dtos/getProductDetails/productDetailsResponse.dto'
import { GetProductsQueryDto } from './dtos/getProducts/getProductsQuery.dto'
import { ProductDto } from './dtos/getProducts/product.dto'
import {
  ProductListResponseDto,
  ProductResponse
} from './dtos/getProducts/productResponse.dto'
import {
  GetProductsOrderByOptionsEnum,
  GetProductsOrderByOptionsValuesEnum
} from './enums/getProductsOrderByOptions.enum'

@Injectable()
export class ProductService {
  private readonly productsUrl: string

  constructor(private readonly httpService: HttpService) {
    this.productsUrl = process.env.BRITANIA_CLIENTE_HIERARQUIA
  }

  /**
   * Busca o código e descrição de produtos
   * @param query GetProductsQueryDto
   * @param authToken string
   */
  getProductDescriptions(
    query: GetProductsQueryDto,
    authToken: string
  ): Promise<PagedResult<ProductDescriptionDto>> {
    return this.getProducts(query, authToken, 'codigoProduto,descricaoProduto')
  }

  /**
   * Busca a lista de produtos
   * @param query GetProductsQueryDto
   * @param authToken string
   */
  async getProducts(
    query: GetProductsQueryDto,
    authToken: string,
    fields?: string
  ): Promise<PagedResult<ProductDto>> {
    try {
      const filter = this.getProductsFilter(query, fields)

      const { data } = await this.httpService
        .get<ProductListResponseDto>(
          `${ this.productsUrl }/api/v1/Produto?${ filter }`,
          {
            headers: { Authorization: `Bearer ${ authToken }` }
          }
        )
        .toPromise()

      return new PagedResult(
        data.totalRegisters,
        data.produtos.map((product) => this.mapProductResponseToDto(product))
      )
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de produtos'
      )
    }
  }

  /**
   * Irá buscar informações do produto
   * @param productCode string
   * @param authToken string
   */
  async getProductDetails(
    productCode: string,
    authToken: string
  ): Promise<ProductDetailsDto> {
    try {
      const response = await this.httpService
        .get<ProductDetailsResponseDto>(
          `${ this.productsUrl }/api/v1/Produto/${ productCode }`,
          {
            headers: { Authorization: `Bearer ${ authToken }` }
          }
        )
        .toPromise()
      if (response.status === 204) return null

      return {
        description: response.data.descricaoProduto?.trim(),
        code: response.data.codigoProduto
      }
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()
      if (error instanceof NotFoundException) return null

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de detalhes de produto'
      )
    }
  }

  /**
   * Monta os filtros para consulta de produtos
   * @param query GetProductsQueryDto
   * @param fields string
   * @returns string
   */
  getProductsFilter(query: GetProductsQueryDto, fields: string): string {
    return qs.stringify({
      q: fields || '*',
      codigoProduto: query.productCode,
      descricaoProduto: query.productDescription,
      codigoLinhaPai: query.lineMasterCode,
      codigoLinha: query.lineCode,
      codigoFamiliaMaterial: query.materialFamilyCode,
      codigoProdutoComercial: query.commercialProductCode,
      codigoGrupoEstoque: query.stockGroupCode,
      page: query.page,
      pageSize: query.pageSize,
      sort: this.getProductsOrderBy(query.orderBy, query.sort)
    })
  }

  /**
   * Monta a ordenação da consulta de produtos
   * @param orderBy GetProductsOrderByOptionsEnum
   * @param sort OrderBySortEnum
   */
  getProductsOrderBy(
    orderBy: GetProductsOrderByOptionsEnum,
    sort: OrderBySortEnum
  ): string {
    const field = orderBy
      ? GetProductsOrderByOptionsValuesEnum[orderBy]
      : 'descricaoproduto'
    const direction = sort ?? 'ASC'

    return `${ field } ${ direction }`
  }

  mapProductResponseToDto(product: ProductResponse): ProductDto {
    return {
      productCode: product.codigoproduto,
      productDescription: product.descricaoproduto?.trim(),
      masterLineCode: product.codigolinhapai,
      masterLineDescription: product.descricaolinhapai,
      lineCode: product.codigolinha,
      lineDescription: product.descricaolinha,
      materialFamilyCode: product.codigofamiliamaterial,
      materialFamilyDescription: product.descricaofamiliamaterial,
      commercialProductCode: product.codigoprodutocomercial,
      commercialProductDescription: product.descricaoprodutocomercial,
      stockGroupCode: product.codigogrupoestoque,
      stockGroupDescription: product.descricaogrupoestoque,
      outLine: product.foralinha,
      outLineImport: product.foralinhaimportacao,
      criticalItem: product.itemcritico
    }
  }
}
