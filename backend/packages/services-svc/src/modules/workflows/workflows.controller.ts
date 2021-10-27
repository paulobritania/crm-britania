import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags
} from '@nestjs/swagger'

import {
  AccessNotRequired,
  BritaniaAuth,
  JwtAuthGuard,
  RequiredAccess,
  RequiredPermission
} from '@britania-crm-com/auth-utils'

import { AccessesEnum } from '../../utils/enums/accesses.enum'
import { PermissionsEnum } from '../../utils/enums/permissions.enum'
import { PagedApiResponse } from '../../utils/pagination/pagedApiResponse.dto'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { Access } from '../accesses/entities/access.entity'
import { CreateWorkflowDto } from './dtos/create/createWorkflow.dto'
import { ListWorkflowDto } from './dtos/findAll/listWorkflow.dto'
import { WorkflowsQueryDto } from './dtos/findAll/workflowQuery.dto'
import { WorkflowDto } from './dtos/findById/workflow.dto'
import { SlaDto } from './dtos/findSLAs/sla.dto'
import { SlaQuery } from './dtos/findSLAs/slaQuery.dto'
import { ListWorkTaskDto } from './dtos/listWorkFlowTask.dto'
import { ListWorkflowVersionDto } from './dtos/listWorkFlowVersion.dto'
import { SlaPreviewDto } from './dtos/slaPreview.dto'
import { UpdateWorkflowDto } from './dtos/update/updateWorkflow.dto'
import { WorkflowTypeDto } from './dtos/workflowType.dto'
import { WorkflowsService } from './workflows.service'

@ApiTags('Workflows')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('workflows')
@RequiredAccess(AccessesEnum.PAINEL_DE_WORKFLOW)
@ApiExtraModels(PagedResult, SlaDto)
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @ApiOkResponse({
    description: 'List of workflows',
    type: ListWorkflowDto,
    isArray: true
  })
  @Get()
  findAll(@Query() query: WorkflowsQueryDto): Promise<ListWorkflowDto[]> {
    return this.workflowsService.findAll(query)
  }

  @Post()
  @RequiredPermission(PermissionsEnum.INCLUIR)
  create(
    @Body() data: CreateWorkflowDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    return this.workflowsService.create(data, userId)
  }

  @PagedApiResponse(SlaDto, 'Paged list of SLAs')
  @AccessNotRequired()
  @Get('sla')
  findSLAs(
    @Query() query: SlaQuery,
    @BritaniaAuth('userId') userId: number
  ): Promise<PagedResult<SlaDto>> {
    return this.workflowsService.getSLAs(query, userId)
  }

  @ApiOkResponse({
    description: 'Preview of user SLAs',
    type: SlaPreviewDto
  })
  @AccessNotRequired()
  @Get('sla/preview')
  findSLAPreview(
    @BritaniaAuth('userId') userId: number
  ): Promise<SlaPreviewDto> {
    return this.workflowsService.findSLAPreview(userId)
  }

  @Get('/types')
  getTypes(): Promise<WorkflowTypeDto[]> {
    return this.workflowsService.getTypes()
  }

  @Get(':workflowTypeId/accesses')
  getWorkflowTypeAccess(
    @Param('workflowTypeId') typeId: number
  ): Promise<Access[]> {
    return this.workflowsService.getWorkflowTypeAccess(typeId)
  }

  @ApiOkResponse({
    description: 'Workflow',
    type: WorkflowDto
  })
  @Get(':id')
  findById(@Param('id') id: number): Promise<WorkflowDto> {
    return this.workflowsService.findById(id)
  }

  @ApiNoContentResponse()
  @Put(':id/deactivate')
  @HttpCode(204)
  @RequiredPermission(PermissionsEnum.INATIVAR)
  deactivate(
    @Param('id') id: number,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<void> {
    return this.workflowsService.deactivate(id, userId)
  }

  @Put(':id')
  @RequiredPermission(PermissionsEnum.EDITAR)
  update(
    @Param('id') id: number,
    @Body() data: UpdateWorkflowDto,
    @BritaniaAuth(['userId']) userId: number
  ): Promise<number> {
    return this.workflowsService.update(id, data, userId)
  }

  @ApiOkResponse({
    description: 'List of WorkFlow Tasks',
    type: ListWorkTaskDto,
    status: 200
  })
  @Get(':id/tasks')
  findTasks(@Param('id') workFlowId: number): Promise<ListWorkTaskDto[]> {
    return this.workflowsService.getWorkFlowTasks(workFlowId)
  }

  @ApiOkResponse({
    description: 'List of WorkFlow',
    type: ListWorkflowVersionDto,
    status: 200
  })
  @Get('types/:typeId/version')
  findWorkFlowVersionsByType(
    @Param('typeId') typeId: number
  ): Promise<ListWorkflowVersionDto[]> {
    return this.workflowsService.getWorkFlowVersionsByType(typeId)
  }
}
