import {
  Controller,
  UseGuards,
  Get,
  Query,
  Param,
  Put,
  Body,
  Post
} from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiExtraModels
} from '@nestjs/swagger'

import {
  JwtAuthGuard,
  BritaniaAuth,
  RequiredAccess,
  RequiredPermission
} from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PermissionsEnum } from '../../utils/enums/permissions.enum'
import { PagedApiResponse } from '../../utils/pagination/pagedApiResponse.dto'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { ChangeClientRankingDto } from '../clientRankings/dto/changeRequest/changeClientRanking.dto'
import { Ranking } from '../clientRankings/entities/ranking.entity'
import { ClientRegionalManagerDto } from '../hierarchy/dtos/clientRegionalManager.dto'
import { GetClientHierarchyRepresentativesQueryDto } from '../hierarchy/dtos/getRegionalClientQuery.dto'
import { WorkflowPerformedHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { CreateClientRegisterDto } from '../workflowsPerformedTypes/clientRegister/dto/create/createClientRegister.dto'
import { FindDetailsClientRegisterDto } from '../workflowsPerformedTypes/clientRegister/dto/find/findDetailsClientRegister.dto'
import { ClientsService } from './clients.service'
import { ClientGroupsDto } from './dto/clientGroups.dto'
import { ClientGroupsQueryDto } from './dto/clientGroupsQuery.dto'
import { ClientQueryDto } from './dto/findAll/clientQuery.dto'
import { ClientQueryDescriptionDto } from './dto/findAll/clientQueryDescription.dto'
import { ParentCompanyDto } from './dto/findAll/listClient.dto'
import { ListClientDescriptionDto } from './dto/findAll/listClientDescription.dto'
import { FindBranchesDto } from './dto/findBranches/findBranches.dto'
import { FindBranchesQueryDto } from './dto/findBranches/findBranchesQuery.dto'
import { FindDetailsDto } from './dto/findDetails/findDetails.dto'
import { OperationNatureQueryDto } from './dto/operationNatureQuery.dto'
import { OperationNatureReturnDto } from './dto/operationNatureReturn.dto'
import { PriceListQueryDto } from './dto/priceListQuery.dto'
import { PriceListReturnDto } from './dto/priceListReturn.dto'
import { UpdateClientDto } from './dto/update/updateClient.dto'


@ApiTags('Clients')
@Controller('clients')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@RequiredAccess(AccessesEnum.CLIENTES)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('pre-register')
  createPreRegister(
    @Body() data: CreateClientRegisterDto,
    @BritaniaAuth('userId') userId: number
  ): Promise<number> {
    return this.clientsService.createPreRegister(data, userId)
  }

  @Put('pre-register/start-workflow/:workflowClientRegisterId')
  startWorkflowPreRegister(
    @Param('workflowClientRegisterId') workflowClientRegisterId: number,
    @BritaniaAuth('userId') userId: number
  ): Promise<number> {
    return this.clientsService.startWorkflowPreRegister(
      workflowClientRegisterId,
      userId
    )
  }

  @Put('pre-register/:workflowClientRegisterId')
  updatePreRegister(
    @Param('workflowClientRegisterId') workflowClientRegisterId: number,
    @Body() data: CreateClientRegisterDto,
    @BritaniaAuth('userId') userId: number
  ): Promise<number> {
    return this.clientsService.updatePreRegister(
      data,
      workflowClientRegisterId,
      userId
    )
  }

  @ApiResponse({
    description: 'List of groups',
    type: ClientGroupsDto,
    status: 200
  })
  @Get('groups')
  findAllGroups(
    @Query() query: ClientGroupsQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<ClientGroupsDto[]> {
    return this.clientsService.getGroups(query, tokenBritania)
  }

  @ApiResponse({
    status: 200,
    type: PriceListReturnDto,
    isArray: true,
    description: 'price list'
  })
  @Get('price-list')
  findPriceList(
    @Query() query: PriceListQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<PriceListReturnDto[]> {
    return this.clientsService.getPriceList(query, tokenBritania)
  }

  @ApiResponse({
    status: 200,
    type: OperationNatureReturnDto,
    isArray: true,
    description: 'nature of operations'
  })
  @Get('operation-nature')
  findOperationNature(
    @Query() query: OperationNatureQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<OperationNatureReturnDto[]> {
    return this.clientsService.findOperationNature(query, tokenBritania)
  }

  @ApiOkResponse({
    description: 'Detail of pre register client',
    status: 200,
    type: FindDetailsClientRegisterDto,
    isArray: false
  })
  @Get('pre-register/:workflowClientRegisterId')
  findPreRegister(
    @Param('workflowClientRegisterId') workflowClientRegisterId: number,
    @BritaniaAuth('userId') userId: number
  ): Promise<FindDetailsClientRegisterDto> {
    return this.clientsService.getPreRegister(workflowClientRegisterId, userId)
  }

  @Get('categories')
  findCategory(): Array<string> {
    return this.clientsService.getClientCategory()
  }

  @ApiNoContentResponse()
  @Put(':clientTotvsCode')
  @RequiredPermission(PermissionsEnum.EDITAR)
  update(
    @Param('clientTotvsCode') clientTotvsCode: number,
    @BritaniaAuth('userId') userId: number,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string,
    @Body() data: UpdateClientDto
  ): Promise<void> {
    return this.clientsService.update(
      clientTotvsCode,
      userId,
      tokenBritania,
      data
    )
  }

  @ApiExtraModels(PagedResult, ParentCompanyDto)
  @PagedApiResponse(ParentCompanyDto, 'Paged list of Companies')
  @Get('/parent-companies')
  findAllParentCompanies(
    @Query() query: ClientQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<PagedResult<ParentCompanyDto>> {
    return this.clientsService.findAllParentCompanies(query, tokenBritania)
  }

  @ApiExtraModels(PagedResult, ListClientDescriptionDto)
  @PagedApiResponse(ListClientDescriptionDto, 'Paged list of Companies description')
  @Get('/parent-companies/description')
  findAllParentCompaniesDescription(
    @Query() query: ClientQueryDescriptionDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<ListClientDescriptionDto[]>{
    return this.clientsService.findAllParentCompaniesDescriptions(query, tokenBritania)
  }

  @ApiExtraModels(PagedResult, FindBranchesDto)
  @PagedApiResponse(FindBranchesDto, 'Paged list of Branches')
  @Get('parent-companies/:clientCode/branches')
  findBranches(
    @Query() query: FindBranchesQueryDto,
    @Param('clientCode') clientCode: number,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<PagedResult<FindBranchesDto>> {
    return this.clientsService.findBranches(
      query,
      clientCode,
      tokenBritania
    )
  }

  @ApiOkResponse({
    description: 'Client returned successfully',
    isArray: false,
    type: FindDetailsDto
  })
  @Get(':clientTotvsCode')
  findDetails(
    @Param('clientTotvsCode') id: number,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<FindDetailsDto> {
    return this.clientsService.findDetails(id, userId, tokenBritania)
  }

  @ApiOkResponse({
    description: 'Client ranking workflow history',
    isArray: true,
    type: WorkflowPerformedHistoryDto
  })
  @Get(':clientTotvsCode/ranking/workflow-history')
  findClientRankingWorkflowHistory(
    @Param('clientTotvsCode') clientTotvsCode: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    return this.clientsService.findClientRankingWorkflowHistory(clientTotvsCode)
  }

  @ApiOkResponse({
    description: 'Client ranking workflow performed history',
    isArray: true,
    type: WorkflowPerformedResponseHistoryDto
  })
  @Get(':clientTotvsCode/ranking/workflow-history/:workflowPerformedId')
  findClientRankingWorkflowPerformedHistory(
    @Param('clientTotvsCode') clientTotvsCode: number,
    @Param('workflowPerformedId') workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    return this.clientsService.findClientRankingWorkflowPerformedHistory(
      clientTotvsCode,
      workflowPerformedId
    )
  }

  @ApiNoContentResponse({
    description: 'Advance client ranking workflow'
  })
  @Put(':clientTotvsCode/ranking/workflow')
  advanceClientRankingWorkflow(
    @Param('clientTotvsCode') clientTotvsCode: number,
    @BritaniaAuth(['userId']) userId: number,
    @Body() data: WorkflowPerformedResponseDto
  ): Promise<void> {
    return this.clientsService.advanceClientRankingWorkflow(
      clientTotvsCode,
      userId,
      data
    )
  }

  @Get(':clientTotvsCode/ranking/suggestion')
  async rankingSuggestion(
    @Param('clientTotvsCode') clientTotvsCode: number,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<Ranking> {
    return this.clientsService.rankingSuggestion(clientTotvsCode, tokenBritania)
  }

  @RequiredPermission(PermissionsEnum.EDITAR_RANKING_DE_CLIENTE)
  @ApiNoContentResponse()
  @Put(':clientTotvsCode/ranking')
  async changeClientRanking(
    @Param('clientTotvsCode') clientTotvsCode: number,
    @BritaniaAuth('userId') userId: number,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string,
    @Body() data: ChangeClientRankingDto
  ): Promise<void> {
    return this.clientsService.changeClientRanking(
      clientTotvsCode,
      userId,
      tokenBritania,
      data
    )
  }

  @ApiOkResponse({
    description: 'Client update workflow history',
    isArray: true,
    type: WorkflowPerformedHistoryDto
  })
  @Get(':clientTotvsCode/workflow-history')
  findClientUpdateWorkflowHistory(
    @Param('clientTotvsCode') clientTotvsCode: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    return this.clientsService.findClientUpdateWorkflowHistory(clientTotvsCode)
  }

  @ApiOkResponse({
    description: 'Client update workflow performed history',
    isArray: true,
    type: WorkflowPerformedResponseHistoryDto
  })
  @Get(':clientTotvsCode/workflow-history/:workflowPerformedId')
  findClientUpdateWorkflowPerformedHistory(
    @Param('clientTotvsCode') clientTotvsCode: number,
    @Param('workflowPerformedId') workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    return this.clientsService.findClientUpdateWorkflowPerformedHistory(
      clientTotvsCode,
      workflowPerformedId
    )
  }

  @ApiNoContentResponse({
    description: 'Advance client update workflow'
  })
  @Put(':clientTotvsCode/workflow')
  advanceClientUpdateWorkflow(
    @Param('clientTotvsCode') clientTotvsCode: number,
    @BritaniaAuth(['userId']) userId: number,
    @Body() data: WorkflowPerformedResponseDto
  ): Promise<void> {
    return this.clientsService.advanceClientUpdateWorkflow(
      clientTotvsCode,
      userId,
      data
    )
  }

  @ApiOkResponse({
    type: ClientRegionalManagerDto,
    description: 'list of a client regionals managers'
  })
  @Get(':clientCode/regional-managers')
  findRegionalsClient(
    @Param('clientCode') clientCode: number,
    @Query() query: GetClientHierarchyRepresentativesQueryDto,
    @BritaniaAuth('userId') userId: number
  ): Promise<ClientRegionalManagerDto[]> {
    return this.clientsService.getClientRegionalManagers(
      query,
      clientCode,
      userId
    )
  }

  @ApiOkResponse({
    type: ClientRegionalManagerDto,
    description: 'list of a client responsible'
  })
  @Get(':clientCode/responsible')
  findClientResponsible(
    @Param('clientCode') clientCode: number,
    @Query() query: GetClientHierarchyRepresentativesQueryDto,
    @BritaniaAuth('userId') userId: number
  ): Promise<ClientRegionalManagerDto[]> {
    return this.clientsService.getClientResponsible(
      query,
      clientCode,
      userId
    )
  }

  @ApiResponse({
    description: 'Workflow client register history',
    type: WorkflowPerformedHistoryDto,
    isArray: true
  })
  @Get('pre-register/:workflowClientRegisterId/workflow-history')
  findClientRegisterWorkflowHistory(
    @Param('workflowClientRegisterId') workflowClientRegisterId: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    return this.clientsService.findClientRegisterWorkflowHistory(
      workflowClientRegisterId
    )
  }

  @ApiResponse({
    description: 'Workflow client register performed history',
    type: WorkflowPerformedResponseHistoryDto,
    isArray: true
  })
  @Get(
    'pre-register/:workflowClientRegisterId/workflow-history/:workflowPerformedId'
  )
  findClientRegisterPerformedWorkflowHistory(
    @Param('workflowClientRegisterId') workflowClientRegisterId: number,
    @Param('workflowPerformedId') workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    return this.clientsService.findClientRegisterPerformedWorkflowHistory(
      workflowClientRegisterId,
      workflowPerformedId
    )
  }

  @ApiNoContentResponse({
    description: 'Advance client register workflow'
  })
  @Put('pre-register/:workflowClientRegisterId/workflow')
  advanceClientRegisterWorkflow(
    @Param('workflowClientRegisterId') workflowClientRegisterId: number,
    @BritaniaAuth(['userId']) userId: number,
    @Body() data: WorkflowPerformedResponseDto
  ): Promise<void> {
    return this.clientsService.advanceClientRegisterWorkflow(
      workflowClientRegisterId,
      userId,
      data
    )
  }
}
