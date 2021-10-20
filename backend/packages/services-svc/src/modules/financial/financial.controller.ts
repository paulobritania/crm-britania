
import { Controller, Inject, Get, UseGuards, Query, Header, Res, Response } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiExtraModels } from '@nestjs/swagger'

import { JwtAuthGuard, RequiredAccess } from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PagedApiResponse } from '../../utils/pagination/pagedApiResponse.dto'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { FindFinancialSecuritiesDto } from './dtos/findFinancialSecurities.dto'
import { FindFinancialSecuritiesQueryDto } from './dtos/findFinancialSecuritiesQuery.dto'
import { GetFinancialSecuritiesReportQueryDto } from './dtos/getFinancialSecuritiesReport/getFinancialSecuritiesReportQuery.dto'
import { FinancialService } from './financial.service'

@ApiTags('Financial')
@Controller('financial')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiExtraModels(PagedResult, FindFinancialSecuritiesDto)
export class FinancialController {
  constructor(
    @Inject('FinancialService') private readonly financialService: FinancialService
  ) {}

  @PagedApiResponse(FindFinancialSecuritiesDto, 'Paged list of financial securities')
  @RequiredAccess(AccessesEnum.CONTAS_A_RECEBER)
  @Get('financial-securities')
  findFinancialSecurities(
    @Query() query: FindFinancialSecuritiesQueryDto
  ): Promise<PagedResult<FindFinancialSecuritiesDto>> {
    return this.financialService.findFinancialSecurities(query)
  }

  @RequiredAccess(AccessesEnum.CONTAS_A_RECEBER)
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  )
  @Header(
    'Content-disposition',
    'attachment filename=Relatorio_Titulos_Financeiros.xls'
  )
  @Get('financial-securities/report')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getFinancialSecuritiesReport(
    @Res() res: Response,
    @Query() query: GetFinancialSecuritiesReportQueryDto
  ) {
    this.financialService.generateFinancialSecuritiesReport(query, res)
  }

}
