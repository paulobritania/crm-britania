import { Controller, Get, UseGuards, Query } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'

import {
  BritaniaAuth,
  JwtAuthGuard,
  RequiredAccess
} from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { FindVpcContractualPercentageQueryDto } from './dtos/findVpcContractualPercentage/findVpcContractualPercentageQuery.dto'
import { VpcContractualPercentageDto } from './dtos/findVpcContractualPercentage/vpcContractualPercentage.dto'
import { FindVpcFundsControlQueryDto } from './dtos/findVpcFundsControl/findVpcFundsControlQuery.dto'
import { VpcFundsControlResponseDto } from './dtos/findVpcFundsControl/vpcFundsControl.dto'
import { ReportsService } from './reports.service'

@ApiTags('Reports')
@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOkResponse({
    description: 'Vpc contractual percentage report data',
    isArray: true,
    type: VpcContractualPercentageDto
  })
  @Get('vpc/contractual-percentage')
  @RequiredAccess(AccessesEnum.RELATORIOS_VPC)
  findVpcContractualPercentage(
    @Query() query: FindVpcContractualPercentageQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<VpcContractualPercentageDto[]> {
    return this.reportsService.findVpcContractualPercentage(
      query,
      tokenBritania
    )
  }

  @ApiOkResponse({
    description: 'Vpc funds control report data',
    type: VpcFundsControlResponseDto
  })
  @Get('vpc/funds-control')
  @RequiredAccess(AccessesEnum.RELATORIOS_VPC)
  findVpcFundsControl(
    @Query() query: FindVpcFundsControlQueryDto
  ): Promise<VpcFundsControlResponseDto> {
    return this.reportsService.findVpcFundsControl(query)
  }
}
