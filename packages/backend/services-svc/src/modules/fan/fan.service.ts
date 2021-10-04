import { Injectable, Inject, ForbiddenException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { WhereOptions, IncludeOptions, Order } from 'sequelize'

import { convertToFindOptions } from '../../utils/pagination/pagedQuery.dto'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { File } from '../files/entities/file.entity'
import { HierarchyService } from '../hierarchy/hierarchy.service'
import { CreateWorkflowFanDto } from '../workflowsPerformedTypes/fan/dto/create/createWorkflowFan.dto'
import { CreateWorkflowFanDocumentDto } from '../workflowsPerformedTypes/fan/dto/create/createWorkflowFanDocument.dto'
import { UpdateWorkflowFanDto } from '../workflowsPerformedTypes/fan/dto/update/updateWorkflowFan.dto'
import { WorkflowFan } from '../workflowsPerformedTypes/fan/entities/workflowFan.entity'
import { WorkflowFanDocument } from '../workflowsPerformedTypes/fan/entities/workflowFanDocument.entity'
import { WorkflowFanFamily } from '../workflowsPerformedTypes/fan/entities/workflowFanFamily.entity'
import { WorkflowFanFamilyException } from '../workflowsPerformedTypes/fan/entities/workflowFanFamilyException.entity'
import { WorkflowFanGoalAchivement } from '../workflowsPerformedTypes/fan/entities/workflowFanGoalAchivement.entity'
import { WorkflowFanLine } from '../workflowsPerformedTypes/fan/entities/workflowFanLine.entity'
import { WorkflowFanLineException } from '../workflowsPerformedTypes/fan/entities/workflowFanLineException.entity'
import { WorkflowFanNegotiatedFund } from '../workflowsPerformedTypes/fan/entities/workflowFanNegotiatedFund.entity'
import { WorkflowFanPercentage } from '../workflowsPerformedTypes/fan/entities/workflowFanPercentage.entity'
import { WorkflowFanService } from '../workflowsPerformedTypes/fan/fan.service'
import { FindAllFanNumbersQueryDto } from './dto/find/findAllFanNumbersQuery.dto'
import { FindAllFanQueryDto } from './dto/find/findAllFanQuery.dto'
import { FindOneFanReturnDto } from './dto/find/findOneFanReturn.dto'
@Injectable()
export class FanService {
  constructor(
    @Inject(WorkflowFanService) private workflowFanService: WorkflowFanService,
    @InjectModel(WorkflowFan) private workflowFan: typeof WorkflowFan,
    @Inject(HierarchyService)
    private hierarchyService: HierarchyService
  ) {}

  /**
   * irá invocar o método de criação de registros
   * do FAN
   * @param data UpdateWorkflowFanDto
   * @param workflowFanId number
   * @param userId number
   */
  create(
    data: CreateWorkflowFanDto,
    userId: number,
    authToken: string
  ): Promise<number> {
    return this.workflowFanService.create(data, userId, authToken)
  }

  /**
   * irá invocar o método de atualização de registros
   * do FAN
   * @param data UpdateWorkflowFanDto
   * @param workflowFanId number
   * @param userId number
   */
  update(
    data: UpdateWorkflowFanDto,
    workflowFanId: number,
    userId: number,
    authToken: string
  ): Promise<number> {
    return this.workflowFanService.update(
      data,
      workflowFanId,
      userId,
      authToken
    )
  }

  /**
   * irá invocar o método de inicialização do workflow do FAN
   * do FAN
   * @param data UpdateWorkflowFanDto
   * @param workflowFanId number
   * @param userId number
   */
  startWorkflow(workflowFanId: number, userId: number): Promise<number> {
    return this.workflowFanService.startWorkflow(workflowFanId, userId)
  }

  /**
   * irá criar invocar o método de criação de documentos
   * do FAN
   * @param workflowFanId number
   * @param data CreateWorkflowFanDocumentDto
   */
  async createDocuments(
    workflowFanId: number,
    data: CreateWorkflowFanDocumentDto
  ): Promise<number> {
    return this.workflowFanService.createDocuments(workflowFanId, data)
  }

  /**
     Irá buscar todos os FANS validando pelo código do representante
    @param vpcId number
    @param userId number
  */
  async getAllFans(
    query: FindAllFanQueryDto,
    userId: number
  ): Promise<PagedResult<WorkflowFan>> {
    const result: PagedResult<WorkflowFan> = {
      totalRegisters: 0,
      data: []
    }
    const clientCodes = await this.hierarchyService.getUserClientCodes(userId)

    if(!clientCodes) return result

    result.totalRegisters = await this.workflowFan.count({
      where: this.findAllFanWhere(query, clientCodes)
    })

    result.data = await this.workflowFan.findAll({
      where: this.findAllFanWhere(query, clientCodes),
      attributes: [
        'id',
        'number',
        'company',
        'parentCompanyName',
        'responsible',
        'regionalManager',
        'directorship',
        'startDate',
        'endDate'
        // falta verbas
      ],
      ...convertToFindOptions(query.page, query.pageSize),
      order: this.findAllFanOrderBy(query)
    })
    return result
  }

  findAllFanOrderBy(query: FindAllFanQueryDto): Order {
    return [[query.orderBy ?? 'id', query.sort || 'ASC']]
  }

  /**
   * Retorna os números de FAN
   * cadastrados, filtrando pelo próprio
   * número
   * @param userId: number
   */
  async getAllFanNumbers(query: FindAllFanNumbersQueryDto, userId: number): Promise<string[]> {
    const clientCodes = await this.hierarchyService.getUserClientCodes(userId)

    if(!clientCodes) return []

    const fans = await this.workflowFan.findAll({
      where: {
        ...(clientCodes.length && {
          parentCompanyCode: {
            $in: clientCodes
          }
        }),
        ...(query.number && {
          number: {
            $like: `%${ query.number }%`
          }
        })
      },
      attributes: ['number']
    })
    return fans.map((fan) => fan.number)
  }

  /**
   * Monta a clausula where da listagem de fans
   * @param query FindAllFanQueryDto
   * @param clientCodes  number[]
   * @returns WhereOptions
   */
  findAllFanWhere(
    query: FindAllFanQueryDto,
    clientCodes: number[]
  ): WhereOptions {
    return {
      ...(clientCodes.length && {
        parentCompanyCode: {
          $in: clientCodes
        }
      }),
      ...(query.number && {
        number: {
          $like: `%${ query.number }%`
        }
      }),
      ...(query.company && {
        company: {
          $like: `%${ query.company }%`
        }
      }),
      ...(query.parentCompanyName && {
        parentCompanyName: {
          $like: `%${ query.parentCompanyName }%`
        }
      }),
      ...(query.representative && {
        representative: {
          $like: `%${ query.representative }%`
        }
      })
    }
  }

  /**
   * Irá retornar o FAN informado e o FAN registrado anteriormente
   * validando pelo código do representante
   * @param workflowFanId number
   * @param userId number
   */
  async getFan(
    workflowFanId: number,
    userId: number,
    authToken: string
  ): Promise<FindOneFanReturnDto> {
    const fan = await this.workflowFan.findByPk(workflowFanId, {
      ...this.findOneFanInclude()
    })
    if (!fan) return null
    let lastFan: WorkflowFan
    const lastFanReference = await this.workflowFanService.getFanByHierarchy(
      {
        _lowerThenId: workflowFanId
      },
      fan.lines,
      fan.linesExceptions,
      fan.families,
      fan.familiesExceptions,
      fan.parentCompanyCode,
      fan.directorship,
      authToken
    )
    if (lastFanReference)
      lastFan = await this.workflowFan.findByPk(lastFanReference.id, {
        ...this.findOneFanInclude()
      })

    if (
      !(await this.hierarchyService.checkIfUserHasAccessToAClient(
        userId,
        fan.parentCompanyCode
      ))
    )
      throw new ForbiddenException()

    return {
      fan,
      lastFan
    }
  }

  findOneFanInclude(): IncludeOptions {
    return {
      include: [
        {
          model: WorkflowFanLine
        },
        {
          model: WorkflowFanLineException
        },
        {
          model: WorkflowFanFamily
        },
        {
          model: WorkflowFanFamilyException
        },
        {
          model: WorkflowFanPercentage
        },
        {
          model: WorkflowFanNegotiatedFund
        },
        {
          model: WorkflowFanGoalAchivement
        },
        {
          model: WorkflowFanDocument,
          include: [
            {
              model: File
            }
          ]
        }
      ]
    }
  }

  /**
   * Irá invocar o método de deleção de documento do FAN
   * @param workflowFanId
     @param documentId
     @param userId
   */
  async deleteDocument(documentId: number, userId: number): Promise<void> {
    return this.workflowFanService.deleteDocument(documentId, userId)
  }
}
