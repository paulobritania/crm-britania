import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'

import {
  JwtAuthGuard,
  BritaniaAuth,
  RequiredAccess,
  RequiredPermission
} from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PermissionsEnum } from '../../utils/enums/permissions.enum'
import { ClientRankingsService } from './clientRankings.service'
import { FindAllClientRankingDto } from './dto/findAll/findAllClientRanking.dto'
import { UpdateClientRankingDto } from './dto/update/updateClientRanking.dto'
import { Ranking } from './entities/ranking.entity'
import { RankingIndicatorValue } from './entities/rankingIndicatorValue.entity'

@ApiTags('Client Rankings')
@Controller('client-rankings')
@UseGuards(JwtAuthGuard)
@RequiredAccess(AccessesEnum.RANKING_DO_CLIENTE)
@ApiBearerAuth()
export class ClientRankingsController {
  constructor(private readonly clientRankingsService: ClientRankingsService) {}

  @ApiOkResponse({
    description: 'List of ranking indicators',
    type: FindAllClientRankingDto,
    isArray: false
  })
  @Get()
  async findAll(): Promise<FindAllClientRankingDto> {
    return this.clientRankingsService.findAll()
  }

  @ApiOkResponse({
    description: 'Ranking indicators updated successfully',
    type: RankingIndicatorValue,
    isArray: false
  })
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Put()
  async update(
    @Body() data: UpdateClientRankingDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<RankingIndicatorValue[]> {
    return this.clientRankingsService.update(data, userId)
  }

  @ApiOkResponse({
    description: 'List of all rankings with description and values',
    type: Ranking,
    isArray: false
  })
  @Get('rankings')
  async rankings(): Promise<Ranking[]> {
    return this.clientRankingsService.findAllRankings()
  }
}
