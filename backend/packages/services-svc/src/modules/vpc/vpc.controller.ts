/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Header,
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Put,
  Query,
  Res
} from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiExtraModels
} from '@nestjs/swagger'

import { BritaniaAuth, JwtAuthGuard } from '@britania-crm-com/auth-utils'

import { PagedApiResponse } from '../../utils/pagination/pagedApiResponse.dto'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { ListWorkflowVersionDto } from '../workflows/dtos/listWorkFlowVersion.dto'
import { WorkflowPerformedHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { CreateWorkflowVpcDto } from '../workflowsPerformedTypes/vpc/dto/create/createWorkflowVpc.dto'
import { UpdateWorkflowVpcDto } from '../workflowsPerformedTypes/vpc/dto/update/updateWorkflowVpc.dto'
import { WorkflowVpc } from '../workflowsPerformedTypes/vpc/entities/workflowVpc.entity'
import { FindAllVpcDto } from './dto/find/findAllVpc.dto'
import { FindAllVpcQueryDto } from './dto/find/findAllVpcQuery.dto'
import { FindVpcDto } from './dto/findVpc/findVpc.dto'
import { VpcReportPdfDto } from './dto/findVpc/vpcReportPdfDto'
import { RequestReturnDto } from './dto/requestReturn.dto'
import { UnidentifiedFoundsDto } from './dto/unidentifiedFounds/unidentifiedFounds.dto'
import { UnidentifiedFoundsQueryDto } from './dto/unidentifiedFounds/unidentifiedFoundsQuery.dto'
import { VpcService } from './vpc.service'

@ApiTags('Vpcs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('vpcs')
export class VpcController {
  constructor(private readonly vpcService: VpcService) {}

  @ApiExtraModels(PagedResult, UnidentifiedFoundsDto)
  @PagedApiResponse(UnidentifiedFoundsDto, 'list of unidentified founds')
  @Get('unidentified-founds')
  getUnidentifiedFounds(
    @Query() query: UnidentifiedFoundsQueryDto,
    @BritaniaAuth(['tokenBritania']) tokenBritania: string
  ): Promise<PagedResult<UnidentifiedFoundsDto>> {
    return this.vpcService.getUnidentifiedFounds(query, tokenBritania)
  }

  @ApiResponse({
    status: 200,
    type: RequestReturnDto,
    description: 'request info'
  })
  @Get('request/:numberRequest')
  findRequest(
    @Param('numberRequest') numberRequest: number,
    @BritaniaAuth('tokenBritania') authToken: string
  ): Promise<RequestReturnDto> {
    return this.vpcService.getRequest(numberRequest, authToken)
  }

  @ApiResponse({
    status: 200,
    type: WorkflowVpc,
    description: 'vpc detail'
  })
  @Get(':VpcId')
  findVpc(
    @Param('VpcId') vpcId: number,
    @BritaniaAuth('userId') userId: number
  ): Promise<FindVpcDto> {
    return this.vpcService.getVpc(vpcId, userId)
  }

  @ApiResponse({
    status: 200,
    type: VpcReportPdfDto,
    description: 'vpc detail report pdf'
  })
  @Get(':VpcId/report-pdf')
  findVpcReportPdf(
    @Param('VpcId') vpcId: number,
    @BritaniaAuth('userId') userId: number
  ): Promise<VpcReportPdfDto> {
    return this.vpcService.getVpcReportPdf(vpcId, userId)
  }

  @Put(':vpcId')
  update(
    @Param('vpcId') vpcId: number,
    @Body() data: UpdateWorkflowVpcDto,
    @BritaniaAuth('userId') userId: number
  ): Promise<number> {
    return this.vpcService.update(data, vpcId, userId)
  }

  @Post()
  create(
    @Body() data: CreateWorkflowVpcDto,
    @BritaniaAuth('userId') userId: number
  ): Promise<number> {
    return this.vpcService.create(data, userId)
  }

  @Put(':vpcId/start-workflow')
  startWorkFlow(
    @Param('vpcId') vpcId: number,
    @BritaniaAuth('userId') userId: number
  ): Promise<number> {
    return this.vpcService.startWorkFlow(vpcId, userId)
  }

  @ApiExtraModels(PagedResult, FindAllVpcDto)
  @PagedApiResponse(FindAllVpcDto, 'list of unidentified founds')
  @Get()
  findAllVpcs(
    @Query() query: FindAllVpcQueryDto,
    @BritaniaAuth('userId') userId: number
  ): Promise<PagedResult<FindAllVpcDto>> {
    return this.vpcService.getAllVpcs(query, userId)
  }

  @ApiResponse({
    status: 200,
    type: ListWorkflowVersionDto,
    description: 'list of versions workflow vpc',
    isArray: true
  })
  @Get('workflow/versions')
  async findAllWorkflowVpcVersions(): Promise<ListWorkflowVersionDto[]> {
    return this.vpcService.getAllVersionsWorkflowVpc()
  }

  @ApiOkResponse({
    description: 'VPC workflow history',
    isArray: true,
    type: WorkflowPerformedHistoryDto
  })
  @Get(':workflowId/workflow-history')
  findVpcWorkflowHistory(
    @Param('workflowId') workflowId: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    return this.vpcService.findVpcWorkflowHistory(workflowId)
  }

  @ApiOkResponse({
    description: 'VPC workflow performed history',
    isArray: true,
    type: WorkflowPerformedResponseHistoryDto
  })
  @Get(':workflowId/workflow-history/:workflowVpcPerformedId')
  findVpcWorkflowPerformedHistory(
    @Param('workflowId') workflowId: number,
    @Param('workflowVpcPerformedId') workflowVpcPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    return this.vpcService.findVpcWorkflowPerformedHistory(
      workflowId,
      workflowVpcPerformedId
    )
  }

  @ApiNoContentResponse({
    description: 'Advance VPC workflow'
  })
  @Put(':workflowVpcId/workflow')
  advanceVpcWorkflow(
    @Param('workflowVpcId') workflowVpcId: number,
    @BritaniaAuth(['userId']) userId: number,
    @Body() data: WorkflowPerformedResponseDto
  ): Promise<void> {
    return this.vpcService.advanceVpcWorkflow(workflowVpcId, userId, data)
  }

  @ApiOkResponse({
    description: 'Synthetic excel report for VPC'
  })
  @Get('/report/synthetic')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  )
  @Header('Content-disposition', 'attachment filename=Relatorio.xls')
  getReportSynthetic(
    @Res() res: any,
    @Query() query: FindAllVpcQueryDto,
    @BritaniaAuth('userId') userId: number
  ) {
    this.vpcService.generateReportSynthetic(res, userId, query)
  }

  @ApiOkResponse({
    description: 'Analytical excel report for VPC'
  })
  @Get('report/analytical')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  )
  @Header('Content-disposition', 'attachment filename=Relatorio.xls')
  getReportAnalytical(
    @Res() res: any,
    @Query() query: FindAllVpcQueryDto,
    @BritaniaAuth('userId') userId: number
  ) {
    this.vpcService.generateReportAnalytical(res, userId, query)
  }
}
