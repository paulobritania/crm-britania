import {
  Controller,
  Inject,
  Get,
  UseGuards,
  Post,
  Body,
  Put,
  Param,
  Query,
  Delete
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
import { CompaniesBankAccountDto } from './dtos/companiesBankAccount.dto'
import { CompaniesBankAccountQueryDto } from './dtos/companiesBankAccountQuery.dto'
import { CompanyDto } from './dtos/company.dto'
import { CompanyQueryDto } from './dtos/companyQuery.dto'
import { CompaniesBankAccount } from './entities/companiesBankAccount.entity'
import { Company } from './entities/company.entity'

@ApiTags('Companies')
@Controller('companies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@RequiredAccess(AccessesEnum.CADASTRO_EMPRESAS)
@ApiExtraModels(PagedResult, CompanyDto, CompaniesBankAccountDto)
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

  @PagedApiResponse(CompaniesBankAccount, 'bank account list of companies')
  @Get('/company-bank-account')
  findCompaniesBankAccount(@Query() query: CompaniesBankAccountQueryDto): Promise<PagedResult<CompaniesBankAccountDto>> {
    return this.companiesService.findCompaniesBankAccount(query)
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
    description: 'Bank Account returned successfully',
    type: CompaniesBankAccountDto,
    isArray: false
  })
  @Get('/company-bank-account/:id')
  findOneBankAccount(@Param('id') id: number): Promise<CompaniesBankAccountDto>{
    return this.companiesService.findOneBankAccount(id);
  }
  @ApiResponse({
    type: Number
  })
  @RequiredPermission(PermissionsEnum.INCLUIR)
  @Post()
  async createCompany(
    @Body() data: CompanyDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    return this.companiesService.create(data, userId)
  }


  @ApiResponse({
    type: Number
  })
  @RequiredPermission(PermissionsEnum.INCLUIR)
  @Post('/company-bank-account')
  async createCompanyBankAccount(
    @Body() data: CompaniesBankAccountDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<CompaniesBankAccount> {
    return this.companiesService.createCompanyBankAccount(data, userId)
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

  @ApiResponse({
    type: Number
  })
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Put('/company-bank-account/:id')
  async updateCompanyBankAccount(
    @Param('id') id: number,
    @Body() data: CompaniesBankAccountDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    return this.companiesService.updateCompanyBankAccount(data, id, userId)
  }

  @ApiOkResponse({
    description: 'bank account deleted successfully',
    isArray: false
  })
  @RequiredPermission(PermissionsEnum.EXCLUIR)
  @Delete('/company-bank-account:id')
  async delete(
    @Param('id') id: number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.companiesService.deleteCompanyBankAccount(id, userId)
  }
}
