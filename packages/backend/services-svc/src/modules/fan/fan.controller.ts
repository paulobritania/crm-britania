import {
  UseGuards,
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Query,
  Delete
} from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiExtraModels,
  ApiNoContentResponse
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
import { CreateWorkflowFanDto } from '../workflowsPerformedTypes/fan/dto/create/createWorkflowFan.dto'
import { CreateWorkflowFanDocumentDto } from '../workflowsPerformedTypes/fan/dto/create/createWorkflowFanDocument.dto'
import { UpdateWorkflowFanDto } from '../workflowsPerformedTypes/fan/dto/update/updateWorkflowFan.dto'
import { WorkflowFan } from '../workflowsPerformedTypes/fan/entities/workflowFan.entity'
import { FindAllFanNumbersQueryDto } from './dto/find/findAllFanNumbersQuery.dto'
import { FindAllFanQueryDto } from './dto/find/findAllFanQuery.dto'
import { FindAllFanReturnDto } from './dto/find/findAllFanReturndto'
import { FindOneFanReturnDto } from './dto/find/findOneFanReturn.dto'
import { FanService } from './fan.service'

@ApiTags('Fan')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiExtraModels(PagedResult, FindAllFanReturnDto)
@Controller('fans')
@RequiredAccess(AccessesEnum.FAN)
export class FanController {
  constructor(private readonly fanService: FanService) {}

  @ApiResponse({
    type: Number
  })
  @RequiredPermission(PermissionsEnum.INCLUIR)
  @Post()
  create(
    @Body() data: CreateWorkflowFanDto,
    @BritaniaAuth('userId') userId: number,
    @BritaniaAuth('tokenBritania') tokenBritania: string
  ): Promise<number> {
    return this.fanService.create(data, userId, tokenBritania)
  }

  @ApiResponse({
    type: Number
  })
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Put(':workflowFanId')
  update(
    @Param('workflowFanId') workflowFanId: number,
    @Body() data: UpdateWorkflowFanDto,
    @BritaniaAuth('tokenBritania') tokenBritania: string,
    @BritaniaAuth('userId') userId: number
  ): Promise<number> {
    return this.fanService.update(data, workflowFanId, userId, tokenBritania)
  }

  @ApiResponse({
    type: Number
  })
  @RequiredPermission(PermissionsEnum.EDITAR)
  @Put('start-workflow/:workflowFanId')
  startWorkflow(
    @Param('workflowFanId') workflowFanId: number,
    @BritaniaAuth('userId') userId: number
  ): Promise<number> {
    return this.fanService.startWorkflow(workflowFanId, userId)
  }

  @ApiResponse({
    type: Number
  })
  @Post(':workflowFanId/documents')
  @RequiredPermission(PermissionsEnum.INCLUIR)
  createDocuments(
    @Param('workflowFanId') workflowFanId: number,
    @Body() data: CreateWorkflowFanDocumentDto
  ): Promise<number> {
    return this.fanService.createDocuments(workflowFanId, data)
  }

  @PagedApiResponse(FindAllFanReturnDto, 'List of FAN')
  @Get()
  findAllFans(
    @Query() query: FindAllFanQueryDto,
    @BritaniaAuth('userId')
    userId: number
  ): Promise<PagedResult<WorkflowFan>> {
    return this.fanService.getAllFans(query, userId)
  }

  @ApiResponse({
    type: String,
    isArray: true
  })
  @Get('numbers')
  findAllFanNumbers(
    @Query() query: FindAllFanNumbersQueryDto,
    @BritaniaAuth('userId') userId: number
  ): Promise<string[]> {
    return this.fanService.getAllFanNumbers(query, userId)
  }

  @ApiResponse({
    type: FindOneFanReturnDto,
    description: 'fan detail'
  })
  @Get(':workflowFanId')
  findOneFan(
    @Param('workflowFanId') workflowFanId: number,
    @BritaniaAuth('userId') userId: number,
    @BritaniaAuth('tokenBritania') tokenBritania: string
  ): Promise<FindOneFanReturnDto> {
    return this.fanService.getFan(workflowFanId, userId, tokenBritania)
  }

  @ApiNoContentResponse({
    description: 'Delete document'
  })
  @Delete('document/:documentId')
  deleteDocument(
    @Param('documentId') documentId: number,
    @BritaniaAuth('userId') userId: number
  ): Promise<void> {
    return this.fanService.deleteDocument(documentId, userId)
  }
}
