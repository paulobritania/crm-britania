import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
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
import { WorkflowPerformedHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { FindAllRepresentativesRegistrationReturnDto } from './dtos/find/findAllRepresentativeRegistrationReturn.dto'
import { FindAllRepresentativesRegistrationsDto } from './dtos/find/findAllRepresentativesRegistrations.dto'
import { FindOneRepresentativeRegistrationDto } from './dtos/find/findOneRepresentativeRegistration.dto'
import { ConcludeRepresentativePreRegistrationDto } from './dtos/preRegistration/concludeRepresentativePreRegistration.dto'
import { SaveRepresentativePreRegistrationDto } from './dtos/preRegistration/saveRepresentativePreRegistration.dto'
import { UpdateRepresentativePreRegistrationDto } from './dtos/preRegistration/updateRepresentativePreRegistration.dto'
import { RepresentativeDto } from './dtos/representative.dto'
import { RepresentativeQueryStringDto } from './dtos/representativesQueryString'
import { RepresentativesService } from './representatives.service'

@ApiTags('Representatives')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('representatives')
export class RepresentativesController {
  constructor(
    private readonly representativesService: RepresentativesService
  ) {}

  @ApiOkResponse({
    description: 'List of representatives',
    type: RepresentativeDto,
    isArray: true
  })
  @Get()
  findAll(
    @Query() query: RepresentativeQueryStringDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<RepresentativeDto[]> {
    return this.representativesService.findAll(query, tokenBritania)
  }

  @ApiExtraModels(PagedResult, FindAllRepresentativesRegistrationReturnDto)
  @PagedApiResponse(
    FindAllRepresentativesRegistrationReturnDto,
    'Paged list of Representative'
  )
  @RequiredAccess(AccessesEnum.CLIENTES)
  @Get('pre-registration')
  findAllRepresentativesRegistrations(
    @Query() query: FindAllRepresentativesRegistrationsDto
  ): Promise<PagedResult<FindAllRepresentativesRegistrationReturnDto>> {
    return this.representativesService.findAllRepresentativesRegistrations(
      query
    )
  }

  @ApiOkResponse({
    description: 'Representative registration',
    type: FindOneRepresentativeRegistrationDto
  })
  @RequiredAccess(AccessesEnum.CLIENTES)
  @Get('pre-registration/:id')
  findRepresentativePreRegistrationByCode(
    @Param('id') id: number,
    @BritaniaAuth('userId') userId: number
  ): Promise<FindOneRepresentativeRegistrationDto> {
    return this.representativesService.findRepresentativePreRegistrationByCode(
      id,
      userId
    )
  }

  @ApiOkResponse({
    description: 'Registration of pre-representatives successfully updated'
  })
  @RequiredPermission(PermissionsEnum.EDITAR)
  @RequiredAccess(AccessesEnum.CLIENTES)
  @Put('pre-registration/:id')
  updateRepresentativePreRegistration(
    @Param('id') id: number,
    @BritaniaAuth(['userId']) userId: number,
    @Body() data: UpdateRepresentativePreRegistrationDto
  ): Promise<void> {
    return this.representativesService.updateRepresentativePreRegistration(
      id,
      userId,
      data
    )
  }

  @ApiOkResponse({
    description: 'Representative',
    type: RepresentativeDto
  })
  @Get(':code')
  findByCode(
    @Param('code') code: number,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<RepresentativeDto> {
    return this.representativesService.findByCode(code, tokenBritania)
  }

  @ApiNoContentResponse()
  @RequiredPermission(PermissionsEnum.INCLUIR)
  @RequiredAccess(AccessesEnum.CLIENTES)
  @Post('pre-registration/save')
  async savePreRegistration(
    @Body() data: SaveRepresentativePreRegistrationDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.representativesService.savePreRegistration(data, userId)
  }

  @ApiNoContentResponse()
  @RequiredPermission(PermissionsEnum.INCLUIR)
  @RequiredAccess(AccessesEnum.CLIENTES)
  @Post('pre-registration/conclude')
  async concludePreRegistration(
    @Body() data: ConcludeRepresentativePreRegistrationDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.representativesService.concludePreRegistration(data, userId)
  }

  @ApiNoContentResponse({
    description: 'Advance VPC workflow'
  })
  @Put(':workflowRepresentativeId/workflow')
  advanceRepresentativeWorkflow(
    @Param('workflowRepresentativeId') workflowRepresentativeId: number,
    @Body() data: WorkflowPerformedResponseDto,
    @BritaniaAuth('userId') userId: number
  ): Promise<void> {
    return this.representativesService.advanceRepresentativeWorkflow(
      workflowRepresentativeId,
      data,
      userId
    )
  }

  @ApiOkResponse({
    description: 'Representative workflow history',
    isArray: true,
    type: WorkflowPerformedHistoryDto
  })
  @Get(':representativeId/workflow-history')
  findRepresentativeWorkflowHistory(
    @Param('representativeId') representativeId: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    return this.representativesService.findRepresentativeWorkflowHistory(
      representativeId
    )
  }

  @ApiOkResponse({
    description: 'Representative workflow performed history',
    isArray: true,
    type: WorkflowPerformedResponseHistoryDto
  })
  @Get(':representativeId/workflow-history/:workflowPerformedId')
  findRepresentativeWorkflowPerformedHistory(
    @Param('representativeId') representativeId: number,
    @Param('workflowPerformedId') workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    return this.representativesService.findRepresentativeWorkflowPerformedHistory(
      representativeId,
      workflowPerformedId
    )
  }
}
