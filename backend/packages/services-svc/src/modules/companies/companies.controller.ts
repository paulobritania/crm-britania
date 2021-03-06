import {
  Controller,
  Inject,
  Get,
  UseGuards,
  Post,
  Body,
  Put,
  Param,
  Query
} from '@nestjs/common'
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiExtraModels
} from '@nestjs/swagger'

import {
  BritaniaAuth,
  JwtAuthGuard,
  RequiredAccess,
  RequiredPermission
} from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PermissionsEnum } from '../../utils/enums/permissions.enum'
import { PagedApiResponse } from '../../utils/pagination/pagedApiResponse.dto'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { CompaniesService } from './companies.service'
import { CompanyDto } from './dtos/company.dto'
import { CompanyQueryDto } from './dtos/companyQuery.dto'
import { Company } from './entities/company.entity'

@ApiTags('Companies')
@Controller('companies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@RequiredAccess(AccessesEnum.CADASTRO_EMPRESAS)
@ApiExtraModels(PagedResult, CompanyDto)
export class CompaniesController {
  constructor(
    @Inject('CompaniesService')
    private readonly companiesService: CompaniesService
  ) {}

  @PagedApiResponse(Company, 'List of companies')
  @Get()
  findAll(@Query() query: CompanyQueryDto): Promise<PagedResult<CompanyDto>> {
    return this.companiesService.findAll(query)
  }

  @ApiOkResponse({
    description: 'Company returned successfully',
    type: CompanyDto,
    isArray: false
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<CompanyDto> {
    return this.companiesService.findOne(id)
  }

  @ApiResponse({
    type: Number
  })
  @RequiredPermission(PermissionsEnum.INCLUIR)
  @Post()
  async createCompany(
    @Body() data: CompanyDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<Company> {
    return this.companiesService.create(data, userId)
  }

  @ApiResponse({
    type: Number
  })
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Put(':id')
  async updateCompany(
    @Param('id') id: number,
    @Body() data: CompanyDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    return this.companiesService.update(data, id, userId)
  }
}
