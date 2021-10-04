/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import {
  Injectable,
  Inject,
  HttpService,
  InternalServerErrorException,
  UnauthorizedException,
  HttpException,
  ForbiddenException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Workbook } from 'exceljs'
import { Sequelize, WhereOptions, QueryTypes } from 'sequelize'
import { Stream } from 'stream'

import {
  getFormattedDate,
  getUtcEndOfDay,
  isValidDate
} from '../../utils/dates/dateUtils'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { File } from '../files/entities/file.entity'
import { HierarchyService } from '../hierarchy/hierarchy.service'
import { User } from '../users/entities/user.entity'
import { ListWorkflowVersionDto } from '../workflows/dtos/listWorkFlowVersion.dto'
import { Workflow } from '../workflows/entities/workflow.entity'
import { WorkflowTask } from '../workflows/entities/workflowTask.entity'
import { WorkflowTaskResponse } from '../workflows/entities/workflowTaskResponse.entity'
import { WorkflowType } from '../workflows/entities/workflowType.entity'
import { WorkflowTypeEnum } from '../workflows/enum/workflowType.enum'
import { WorkflowsService } from '../workflows/workflows.service'
import { WorkflowPerformedHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { WorkflowPerformedResponse } from '../workflowsPerformed/entities/workflowPerformedResponses.entity'
import { WorkflowPerformed } from '../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedService } from '../workflowsPerformed/workflowPerformed.service'
import { CreateWorkflowVpcDto } from '../workflowsPerformedTypes/vpc/dto/create/createWorkflowVpc.dto'
import { UpdateWorkflowVpcDto } from '../workflowsPerformedTypes/vpc/dto/update/updateWorkflowVpc.dto'
import { WorkflowVpc } from '../workflowsPerformedTypes/vpc/entities/workflowVpc.entity'
import { WorkflowVpcAttachment } from '../workflowsPerformedTypes/vpc/entities/workflowVpcAttachments.entity'
import { WorkflowVpcLineFamily } from '../workflowsPerformedTypes/vpc/entities/workflowVpcLineFamily.entity'
import { WorkflowVpcNd } from '../workflowsPerformedTypes/vpc/entities/workflowVpcNd.entity'
import { WorkflowVpcPerformed } from '../workflowsPerformedTypes/vpc/entities/workflowVpcPerformed.entity'
import { WorkflowVpcProduct } from '../workflowsPerformedTypes/vpc/entities/workflowVpcProduct.entity'
import { WorkflowVpcRequest } from '../workflowsPerformedTypes/vpc/entities/workflowVpcRequests.entity'
import { WorkflowVpcStatus } from '../workflowsPerformedTypes/vpc/entities/workflowVpcStatus.entity'
import { WorkflowVpcService } from '../workflowsPerformedTypes/vpc/vpc.service'
import { FindAllVpcDto } from './dto/find/findAllVpc.dto'
import { FindAllVpcQueryDto } from './dto/find/findAllVpcQuery.dto'
import { FindVpcDto } from './dto/findVpc/findVpc.dto'
import { VpcReportPdfDto } from './dto/findVpc/vpcReportPdfDto'
import { RequestResponseDto } from './dto/requestResponse.dto'
import { RequestReturnDto } from './dto/requestReturn.dto'
import { UnidentifiedFoundsDto } from './dto/unidentifiedFounds/unidentifiedFounds.dto'
import { UnidentifiedFoundsQueryDto } from './dto/unidentifiedFounds/unidentifiedFoundsQuery.dto'
import { VpcListViewDto } from './dto/vpcListView.dto'
import { FoundsSituationEnum } from './enum/foundsSituation.enum'
import { StatusEnum, StatusTranslatedEnum } from './enum/status.enum'

const moment = require('moment')

@Injectable()
export class VpcService {
  private readonly request = process.env.BRITANIA_PEDIDO_URL

  constructor(
    private httpService: HttpService,
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(WorkflowVpcService) private workflowVpcService: WorkflowVpcService,
    @Inject(WorkflowsService) private workflowsService: WorkflowsService,
    @Inject(WorkflowPerformedService)
    private workflowPerformedService: WorkflowPerformedService,
    @InjectModel(WorkflowVpc)
    private workflowVpc: typeof WorkflowVpc,
    @InjectModel(WorkflowVpcAttachment)
    private workflowVpcAttachment: typeof WorkflowVpcAttachment,
    @InjectModel(WorkflowVpcNd)
    private workflowVpcNd: typeof WorkflowVpcNd,
    @InjectModel(WorkflowVpcProduct)
    private workflowVpcProduct: typeof WorkflowVpcProduct,
    @InjectModel(WorkflowVpcProduct)
    private workflowVpcRequest: typeof WorkflowVpcRequest,
    @InjectModel(WorkflowVpcLineFamily)
    private workflowVpcLineFamily: typeof WorkflowVpcLineFamily,
    @Inject(HierarchyService)
    private readonly hierarchyService: HierarchyService
  ) {}

  /**
   * Irá buscar informações do pedido
   * @param requestNumber number
   * @param authToken string
   */
  async getRequest(
    requestNumber: number,
    authToken: string
  ): Promise<RequestReturnDto> {
    try {
      const response = await this.httpService
        .get<RequestResponseDto>(
          `${ this.request }/api/v1/Pedido/${ requestNumber }`,
          {
            headers: { Authorization: `Bearer ${ authToken }` }
          }
        )
        .toPromise()
      return {
        code: response.data.codigoCliente,
        name: response.data.nomeCliente,
        value: response.data.itens.reduce(
          (value, item) => (value += item.valorUnitario),
          0
        )
      }
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de detalhes de pedido'
      )
    }
  }

  /**
   * Irá buscar um VPC verificando se o código
   * registrado no VPC está entre um dos códigos
   * de acesso do usuário
   * @param userId number
   */
  async getVpc(vpcId: number, userId: number): Promise<FindVpcDto> {
    const vpc = await this.workflowVpc.findByPk(vpcId, {
      include: [
        {
          model: this.workflowVpcLineFamily,
          required: false
        },
        {
          model: this.workflowVpcNd,
          required: false
        },
        {
          model: this.workflowVpcProduct,
          required: false
        },
        {
          model: this.workflowVpcRequest,
          required: false
        },
        {
          model: this.workflowVpcAttachment,
          required: false,
          include: [{ model: File, required: false }]
        },
        {
          model: User,
          required: false,
          as: 'userCreated',
          attributes: ['username']
        }
      ]
    })
    if (!vpc) return null

    if (
      !(await this.hierarchyService.checkIfUserHasAccessToAClient(
        userId,
        vpc.parentCompanyCode
      ))
    )
      throw new ForbiddenException()

    const workflowInProgress =
      await this.workflowVpcService.findWorkflowInProgress(
        vpc.parentCompanyCode
      )

    const workflowTaskInProgress = workflowInProgress
      ? await this.workflowPerformedService.findWorkflowTaskInProgress(
          workflowInProgress.workflowPerformedId,
          userId,
          true
        )
      : null

    const { situation, taskTitle } = await this.db.query<VpcListViewDto>(
      'SELECT situation, taskTitle FROM vw_vpc_list WHERE id = $1 ORDER BY id ASC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY',
      {
        bind: [vpcId],
        type: QueryTypes.SELECT,
        plain: true
      }
    )

    return {
      ...vpc.toJSON(),
      workflowTaskInProgress,
      situation: this.formatVpcSituation(situation, taskTitle)
    } as FindVpcDto
  }

  /**
   * Irá buscar os dados de VPC para exportação em PDF,
   * verificando se o código registrado no VPC está entre um dos códigos
   * de acesso do usuário
   * @param userId number
   */
  async getVpcReportPdf(
    vpcId: number,
    userId: number
  ): Promise<VpcReportPdfDto> {
    const vpc = await this.workflowVpc.findByPk(vpcId, {
      include: [
        {
          model: this.workflowVpcNd,
          required: false
        },
        {
          model: this.workflowVpcLineFamily,
          required: false
        },
        {
          model: this.workflowVpcProduct,
          required: false
        },
        {
          model: this.workflowVpcRequest,
          required: false
        },
        {
          model: this.workflowVpcAttachment,
          required: false,
          include: [
            {
              model: File,
              attributes: ['id', 'filename']
            }
          ]
        },
        {
          model: WorkflowVpcPerformed,
          attributes: ['workflowVpcId', 'workflowPerformedId'],
          include: [
            {
              model: WorkflowPerformed,
              attributes: ['createdAt', 'id'],
              required: true,
              include: [
                {
                  model: User,
                  attributes: ['username'],
                  required: true,
                  paranoid: false
                },
                {
                  model: Workflow,
                  attributes: ['version', 'subversion'],
                  required: true,
                  include: [
                    {
                      model: WorkflowType,
                      required: true,
                      attributes: ['code', 'description']
                    }
                  ]
                },
                {
                  model: WorkflowPerformedResponse,
                  required: false,
                  attributes: ['id', 'justification', 'createdAt'],
                  include: [
                    {
                      model: WorkflowTaskResponse,
                      attributes: ['title'],
                      include: [
                        {
                          model: WorkflowTask,
                          attributes: ['title']
                        }
                      ]
                    },
                    {
                      model: User,
                      attributes: ['username'],
                      paranoid: false
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })
    if (!vpc) return null

    if (
      !(await this.hierarchyService.checkIfUserHasAccessToAClient(
        userId,
        vpc.parentCompanyCode
      ))
    )
      throw new ForbiddenException()

    const vpcPerformeds = vpc.vpcPerformeds.map((vpcPerformeds) => {
      const workflowPerformedHistory =
        this.workflowPerformedService.formatWorkflowToHistory(
          vpcPerformeds.workflowPerformed
        )

      workflowPerformedHistory.workflowPerformedResponseHistory =
        this.workflowPerformedService.formatWorkflowToPerformedHistory(
          vpcPerformeds.workflowPerformed
        )

      return workflowPerformedHistory
    })

    return {
      ...vpc.toJSON(),
      workflowPerformedHistory: vpcPerformeds
    } as VpcReportPdfDto
  }

  /**
   * Irá invocar o método de criação de VPC e suas relações
   * @param data CreateWorkflowVpcDto
   * @param userId number
   */
  async create(data: CreateWorkflowVpcDto, userId: number): Promise<number> {
    return this.workflowVpcService.create(data, userId)
  }

  /**
   * Irá invocar o método de atualização de VPC e suas relações
   * @param data UpdateWorkflowVpcDto
   * @param vpcId number
   * @param userId number
   */
  async update(
    data: UpdateWorkflowVpcDto,
    vpcId: number,
    userId: number
  ): Promise<number> {
    return this.workflowVpcService.update(data, vpcId, userId)
  }

  /**
   * Irá invocar o método de validação e inicialização de workflow
   * @param vpcId number
   * @param userId number
   */
  async startWorkFlow(vpcId: number, userId: number): Promise<number> {
    return this.workflowVpcService.startWorkflow(vpcId, userId)
  }

  findAllVpcWhereString(
    query: FindAllVpcQueryDto,
    clientsCode: number[]
  ): string {
    const likesObj = {
      cnpj: query.cnpj,
      parentCompanyCode: query.parentCompanyCode,
      parentCompanyName: query.parentCompanyName,
      requestNumber: query.requestNumber,
      linesDescription: query.lineDescription,
      taskResponsible: query.responsible
    }
    const defaultLikesNotNull = Object.entries(likesObj).filter(
      (value) => value[1]
    )
    const whereOptions = []
    if (defaultLikesNotNull.length)
      whereOptions.push(
        defaultLikesNotNull
          .map((value) => `${ value[0] } LIKE '%${ value[1] }%'`)
          .join(' AND ')
      )
    if (query.startDate)
      whereOptions.push(
        `startDate >= '${ getFormattedDate(getUtcEndOfDay(query.startDate)) }'`
      )
    if (query.endDate)
      whereOptions.push(
        `endDate <= '${ getFormattedDate(getUtcEndOfDay(query.endDate)) }'`
      )
    if (query.initialValue) whereOptions.push(`value >= ${ query.initialValue }`)
    if (query.finalValue) whereOptions.push(`value <= ${ query.finalValue }`)
    if (query.lineCode && !Number.isNaN(query.lineCode))
      whereOptions.push(
        `id IN (SELECT id FROM vw_vpc_list WHERE lineCode = ${ Number(
          query.lineCode
        ) })`
      )
    if (query.foundsType)
      whereOptions.push(`foundsType = '${ query.foundsType }'`)
    if (query.approverCode)
      whereOptions.push(`approverCode = ${ query.approverCode }`)
    if (clientsCode.length)
      whereOptions.push(`parentCompanyCode IN (${ clientsCode })`)
    if (query.q) {
      whereOptions.push(`(
        cnpj LIKE '%${ query.q }%'
        OR parentCompanyCode LIKE '%${ query.q }%'
        OR parentCompanyName LIKE '%${ query.q }%'
      )`)
    }
    if (query.workflowId) whereOptions.push(`workflowId = ${ query.workflowId }`)
    if (query.workflowTaskId)
      whereOptions.push(`workflowTaskId = ${ query.workflowTaskId }`)
    if (query.sla && isValidDate(query.sla))
      whereOptions.push(
        `sla <= '${ getFormattedDate(getUtcEndOfDay(query.sla)) }'`
      )
    if (query.foundsSituation) {
      if (query.foundsSituation === FoundsSituationEnum.CANCELED)
        whereOptions.push(`situation = '${ StatusEnum.CANCELED }'`)
      if (query.foundsSituation === FoundsSituationEnum.PENDING)
        whereOptions.push(`situation = '${ StatusEnum.WORK_IN_PROGRESS }'`)
      if (
        query.foundsSituation === FoundsSituationEnum.PARTIALLY_PAYED ||
        query.foundsSituation === FoundsSituationEnum.TOTALLY_PAYED
      )
        whereOptions.push(`situation = '${ StatusEnum.CONCLUDED }'`) // TODO ajustar pós integração
    }

    return `${ whereOptions.length ? `WHERE ${ whereOptions.join(' AND ') }` : '' }`
  }

  /**
   * Busca todos os VPCS validando pelo código do cliente
   * @param query FindAllVpcQueryDto
   * @param userId number
   */
  async getAllVpcs(
    query: FindAllVpcQueryDto,
    userId: number
  ): Promise<PagedResult<FindAllVpcDto>> {
    const clientCodes = await this.hierarchyService.getUserClientCodes(userId)

    const { totalRegisters } = await this.db.query<{ totalRegisters: number }>(
      `SELECT COUNT(*) AS totalRegisters FROM (SELECT ID FROM vw_vpc_list ${ this.findAllVpcWhereString(
        query,
        clientCodes
      ) } GROUP BY id) AS Q`,
      {
        type: QueryTypes.SELECT,
        plain: true
      }
    )

    const vpcs = await this.db.query<FindAllVpcDto>(
      `SELECT
        id,
        STRING_AGG(linesDescription, ', ') AS linesDescription,
        situation,
        requestNumber,
        parentCompanyName,
        foundsType,
        deploymentDate,
        value,
        taskTitle,
        taskResponsible,
        taskProfile,
        sla
      FROM vw_vpc_list  ${ this.findAllVpcWhereString(query, clientCodes) }
      GROUP BY
        id,
        situation,
        requestNumber,
        parentCompanyName,
        foundsType,
        deploymentDate,
        value,
        taskTitle,
        taskResponsible,
        taskProfile,
        sla
      ORDER BY ${ query.orderBy || 'id' } ${ query.sort || 'ASC' }
      OFFSET ${ (query.page - 1) * query.pageSize } ROWS FETCH NEXT ${
        query.pageSize
      } ROWS ONLY`,
      {
        type: QueryTypes.SELECT
      }
    )

    return new PagedResult(
      totalRegisters,
      vpcs.map((vpc) => ({
        ...vpc,
        situation: this.formatVpcSituation(vpc.situation, vpc.taskTitle)
      }))
    )
  }

  /**
   * Formata a situação de um vpc
   * @param situation string
   * @param taskTitle string
   * @returns string
   */
  formatVpcSituation(situation: string, taskTitle: string): string {
    if (situation === StatusEnum.WORK_IN_PROGRESS) return taskTitle
    if (situation === StatusEnum.CONCLUDED) return 'Aberta total' // TODO Alterar este tratamento quando houver integração de vpc
    return StatusTranslatedEnum[situation]
  }

  /**
   * Irá retornar todas as versões do workflow do tipo VPC
   */
  async getAllVersionsWorkflowVpc(): Promise<ListWorkflowVersionDto[]> {
    return this.workflowsService.getWorkFlowVersionsByType(
      null,
      WorkflowTypeEnum.VPC
    )
  }

  /**
   * Busca o histórico de workflows do tipo de VPC
   * @param workflowId
   */
  async findVpcWorkflowHistory(
    workflowId: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    return this.workflowVpcService.findWorkflowsVpcHistory(workflowId)
  }

  /**
   * Busca o histórico de execução de um workflow de VPC
   * @param workflowId number
   * @param workflowVpcPerformedId number
   */
  async findVpcWorkflowPerformedHistory(
    workflowId: number,
    workflowVpcPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    return this.workflowVpcService.findVpcWorkflowPerformedHistory(
      workflowId,
      workflowVpcPerformedId
    )
  }

  /**
   * Avança uma etapa no workflow de update de VPC
   * @param workflowVpcId number
   * @param userId number
   * @param data WorkflowPerformedResponseDto
   */
  async advanceVpcWorkflow(
    workflowVpcId: number,
    userId: number,
    data: WorkflowPerformedResponseDto
  ): Promise<void> {
    const transaction = await this.db.transaction()
    try {
      await this.workflowVpcService.advanceVpcWorkflow(
        workflowVpcId,
        userId,
        data,
        transaction
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()

      if (error instanceof HttpException) throw error
      throw new InternalServerErrorException(
        'Ocorreu um erro ao avançar o fluxo de trabalho do VPC'
      )
    }
  }

  getUnidentifiedFounds(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: UnidentifiedFoundsQueryDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tokenBritania: string
  ): Promise<PagedResult<UnidentifiedFoundsDto>> {
    // TODO
    return Promise.resolve(
      new PagedResult<UnidentifiedFoundsDto>(10, [
        { companyCode: 1, companyName: '1', totalValue: 100 },
        { companyCode: 2, companyName: '2', totalValue: 200 },
        { companyCode: 3, companyName: '3', totalValue: 300 },
        { companyCode: 4, companyName: '4', totalValue: 400 },
        { companyCode: 5, companyName: '5', totalValue: 500 },
        { companyCode: 6, companyName: '6', totalValue: 600 },
        { companyCode: 7, companyName: '7', totalValue: 700 },
        { companyCode: 8, companyName: '8', totalValue: 800 },
        { companyCode: 9, companyName: '9', totalValue: 900 }
      ])
    )
  }

  findAllVpcWhere(
    query: FindAllVpcQueryDto,
    clientCodes: number[]
  ): WhereOptions {
    const hasIntervalValue = query.initialValue && query.finalValue

    return {
      ...(clientCodes.length && {
        parentCompanyCode: {
          $in: clientCodes
        }
      }),
      ...(query.cnpj && {
        cnpj: {
          $like: `%${ query.cnpj }%`
        }
      }),
      ...(query.parentCompanyCode && {
        parentCompanyCode: {
          $like: `%${ query.parentCompanyCode }%`
        }
      }),
      ...(query.parentCompanyName && {
        parentCompanyName: {
          $like: `%${ query.parentCompanyName }%`
        }
      }),
      ...(query.requestNumber && {
        requestNumber: {
          $like: `%${ query.requestNumber }%`
        }
      }),
      ...(query.foundsType && {
        foundsType: query.foundsType
      }),
      ...(query.startDate &&
        query.startDate && {
          startDate: {
            $greaterOrEqualThen: moment(query.startDate).utc().startOf('day')
          },
          endDate: {
            $lowerOrEqualThen: moment(query.endDate).utc().endOf('day')
          }
        }),
      ...(hasIntervalValue && {
        value: {
          $greaterOrEqualThen: query.initialValue,
          $lowerOrEqualThen: query.finalValue
        }
      }),
      ...(!hasIntervalValue &&
        query.initialValue && {
          value: {
            $greaterOrEqualThen: query.initialValue
          }
        }),
      ...(!hasIntervalValue &&
        query.finalValue && {
          value: {
            $lowerOrEqualThen: query.finalValue
          }
        }),
      ...(query.approverCode && {
        approverDescription: query.approverCode
      })
    }
  }

  /**
   * Irá gerar o relatório do VPC em excel
   * sem as informações do ND
    @param res: T,
    @param userId: number,
    @param query: FindAllVpcQueryDto
   */
  async generateReportSynthetic<T extends Stream>(
    res: T,
    userId: number,
    query: FindAllVpcQueryDto
  ): Promise<void> {
    const clientCodes = await this.hierarchyService.getUserClientCodes(userId)
    const vpcs: WorkflowVpc[] = !clientCodes
      ? []
      : await this.workflowVpc.findAll({
          where: {
            ...(query.ids && {
              id: {
                $in: query.ids.split(',')
              }
            }),
            ...this.findAllVpcWhere(query, clientCodes)
          },
          include: [
            {
              model: this.workflowVpcLineFamily,
              attributes: ['lineDescription'],
              required: !!query.lineCode,
              where: query.lineCode && {
                lineCode: query.lineCode
              }
            },
            {
              model: WorkflowVpcStatus,
              attributes: ['name']
            }
          ],
          attributes: [
            'approverDescription',
            'parentCompanyCode',
            'parentCompanyName',
            'deploymentDate',
            'foundsType',
            'requestNumber',
            'value',
            'campaignReason',
            'paymentType'
          ]
        })
    const workbook = new Workbook()
    const sheet = workbook.addWorksheet('Report')
    sheet.columns = [
      {
        header: 'Representante',
        key: 'representante',
        width: 20
      },
      {
        header: 'Linhas',
        key: 'linha',
        width: 32
      },
      {
        header: 'Código Cliente',
        key: 'codigoCliente',
        width: 20
      },
      {
        header: 'Cliente Matriz',
        key: 'clienteMatriz',
        width: 20
      },
      {
        header: 'Data de Implantação',
        key: 'dataDeImplantacao',
        width: 20
      },
      {
        header: 'Tipo VPC',
        key: 'tipoVpc',
        width: 20
      },
      {
        header: 'N° Solicitação',
        key: 'numeroSolicitacao',
        width: 20
      },
      {
        header: 'Valor',
        key: 'value',
        width: 15
      },
      {
        header: 'Status',
        key: 'status',
        width: 25
      },
      {
        header: 'Descrição',
        key: 'descricao',
        width: 30
      },
      {
        header: 'Tipo de Débito',
        key: 'tipoDeDebito',
        width: 25
      }
    ]
    const formattedVpcs = vpcs.map((vpc) => ({
      approverDescription: vpc.approverDescription,
      lines: vpc.linesFamilies
        .map((lineFamily) => lineFamily.lineDescription)
        .join(', '),
      parentCompanyCode: vpc.parentCompanyCode,
      parentCompanyName: vpc.parentCompanyName,
      deploymentDate: moment(vpc.deploymentDate).format('DD/MM/YYYY'),
      foundsType: vpc.foundsType,
      requestNumber: vpc.requestNumber,
      value: vpc.value,
      status: vpc.status.name,
      campaignReason: vpc.campaignReason,
      paymentType: vpc.paymentType
    }))
    formattedVpcs.forEach((vpc, i) => {
      i += 2
      const row = sheet.getRow(i)
      Object.values(vpc).forEach((value, y) => {
        y += 1
        const cell = row.getCell(y)
        cell.value = value
      })
    })
    return workbook.xlsx.write(res)
  }

  /**
   * Irá gerar o relatório do VPC em excel
   * com as informações do ND
    @param res: T,
    @param userId: number,
    @param query: FindAllVpcQueryDto
   */
  async generateReportAnalytical<T extends Stream>(
    res: T,
    userId: number,
    query: FindAllVpcQueryDto
  ): Promise<void> {
    const clientCodes = await this.hierarchyService.getUserClientCodes(userId)

    const vpcs: WorkflowVpc[] = !clientCodes
      ? []
      : await this.workflowVpc.findAll({
          where: {
            ...(query.ids && {
              id: {
                $in: query.ids.split(',')
              }
            }),
            ...this.findAllVpcWhere(query, clientCodes)
          },
          include: [
            {
              model: this.workflowVpcLineFamily,
              attributes: ['lineDescription'],
              required: !!query.lineCode,
              where: query.lineCode && {
                lineCode: query.lineCode
              }
            },
            {
              model: WorkflowVpcNd,
              attributes: ['number', 'value', 'issueDate', 'dueDate', 'company']
            },
            {
              model: WorkflowVpcStatus,
              attributes: ['name']
            }
          ],
          attributes: [
            'approverDescription',
            'parentCompanyCode',
            'parentCompanyName',
            'deploymentDate',
            'foundsType',
            'requestNumber',
            'value',
            'campaignReason',
            'paymentType'
          ]
        })
    const workbook = new Workbook()
    const sheet = workbook.addWorksheet('Report')
    sheet.columns = [
      {
        header: 'Representante',
        key: 'representante',
        width: 20
      },
      {
        header: 'Linhas',
        key: 'linha',
        width: 32
      },
      {
        header: 'Código Cliente',
        key: 'codigoCliente',
        width: 20
      },
      {
        header: 'Cliente Matriz',
        key: 'clienteMatriz',
        width: 20
      },
      {
        header: 'Data de Implantação',
        key: 'dataDeImplantacao',
        width: 20
      },
      {
        header: 'Tipo VPC',
        key: 'tipoVpc',
        width: 20
      },
      {
        header: 'N° Solicitação',
        key: 'numeroSolicitacao',
        width: 20
      },
      {
        header: 'Valor',
        key: 'value',
        width: 15
      },
      {
        header: 'Status',
        key: 'status',
        width: 25
      },
      {
        header: 'Descrição',
        key: 'descricao',
        width: 30
      },
      {
        header: 'Tipo de Débito',
        key: 'tipoDeDebito',
        width: 25
      },
      {
        header: 'Número ND',
        key: 'numberNd',
        width: 25
      },
      {
        header: 'Valor ND',
        key: 'valueNd',
        width: 25
      },
      {
        header: 'Data de Emissão',
        key: 'de',
        width: 25
      },
      {
        header: 'Data de Vencimento',
        key: 'dv',
        width: 25
      },
      {
        header: 'Empresa',
        key: 'companyNd',
        width: 25
      }
    ]
    const formattedVpcs = []
    vpcs.forEach((vpc) => {
      vpc = vpc.toJSON() as WorkflowVpc
      vpc.nds.forEach((nd) =>
        formattedVpcs.push({
          approverDescription: vpc.approverDescription,
          lines: vpc.linesFamilies
            .map((lineFamily) => lineFamily.lineDescription)
            .join(', '),
          parentCompanyCode: vpc.parentCompanyCode,
          parentCompanyName: vpc.parentCompanyName,
          deploymentDate: moment(vpc.deploymentDate).format('DD/MM/YYYY'),
          foundsType: vpc.foundsType,
          requestNumber: vpc.requestNumber,
          value: vpc.value,
          status: vpc.status.name,
          campaignReason: vpc.campaignReason,
          paymentType: vpc.paymentType,
          numberNd: nd.number,
          valueNd: nd.value,
          issueDate: nd.issueDate,
          dueDate: nd.dueDate,
          company: nd.company
        })
      )
    })
    formattedVpcs.forEach((vpc, i) => {
      i += 2
      const row = sheet.getRow(i)
      Object.values(vpc).forEach((value: string, y) => {
        y += 1
        const cell = row.getCell(y)
        cell.value = value
      })
    })
    workbook.xlsx.write(res)
  }
}
