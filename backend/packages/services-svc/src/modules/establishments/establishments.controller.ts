import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { BritaniaAuth, JwtAuthGuard, RequiredAccess } from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { EstablishmentsDto } from './dtos/establishments.dto'
import { EstablishmentsQueryDto } from './dtos/establishmentsQuery.dto'
import { EstablishmentsService } from './establishments.service'

@ApiTags('Establishments')
@UseGuards(JwtAuthGuard)
@RequiredAccess(AccessesEnum.CONTROLE_DE_USUARIO)
@ApiBearerAuth()
@Controller('establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @ApiOkResponse({
    description: 'List of establishments',
    type: EstablishmentsDto,
    isArray: true
  })
  @RequiredAccess(AccessesEnum.CLIENTES)
  @Get()
  findAll(
    @Query() query: EstablishmentsQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<EstablishmentsDto[]> {
    return this.establishmentsService.getEstablishments(query, tokenBritania)
  }
}
