import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { FindOptions, literal, QueryTypes, Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { WorkflowTaskInProgressDto } from '../clients/dto/findDetails/workflowTaskInProgress.dto'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { User } from '../users/entities/user.entity'
import { UserRepresentativeCode } from '../users/entities/userRepresentativeCode.entity'
import { Workflow } from '../workflows/entities/workflow.entity'
import { WorkflowTask } from '../workflows/entities/workflowTask.entity'
import { WorkflowTaskResponse } from '../workflows/entities/workflowTaskResponse.entity'
import { WorkflowType } from '../workflows/entities/workflowType.entity'
import { WorkflowTypeEnum } from '../workflows/enum/workflowType.enum'
import { WorkflowsService } from '../workflows/workflows.service'
import { AdvanceWorkflowResultDto } from './dtos/advanceWorkflowResult.dto'
import { ApproverFilterDto } from './dtos/hierarchyFilter.dto'
import { WorkflowPerformedHistoryDto } from './dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from './dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from './dtos/workflowPerformedResponseHistory.dto'
import { WorkflowTasksInProgressDto } from './dtos/workflowTasksInProgress.dto'
import { WorkflowPerformedResponse } from './entities/workflowPerformedResponses.entity'
import { WorkflowPerformed } from './entities/workflowsPerformed.entity'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment')

@Injectable()
export class WorkflowPerformedService {
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(WorkflowsService) private workflowsService: WorkflowsService,
    @InjectModel(WorkflowPerformed)
    private workflowPerformedModel: typeof WorkflowPerformed,
    @InjectModel(WorkflowPerformedResponse)
    private workflowPerformedResponseModel: typeof WorkflowPerformedResponse,
    @InjectModel(Hierarchy)
    private hierarchyModel: typeof Hierarchy
  ) {}

  async startWorkflow(
    workflowTypeEnum: WorkflowTypeEnum,
    userId: number,
    transaction: Transaction,
    registerIdentifier: number = null,
    clientCode: number = null,
    responsibleCode: number = null
  ): Promise<number> {
    const workflowType = await this.workflowsService.getWorkflowTypeId(
      workflowTypeEnum,
      transaction
    )

    if (!workflowType)
      throw new BadRequestException(
        'O tipo do fluxo de trabalho informado é inválido'
      )

    const workflow = await this.workflowsService.getWorkflowIdInProgress(
      workflowType.id,
      transaction
    )

    if (!workflow)
      throw new BadRequestException(
        `Não existe nenhum fluxo de trabalho do tipo ${ workflowTypeEnum } em execução`
      )

    const payload = {
      workflowId: workflow.id,
      createdBy: userId,
      createdAt: moment().utc(),
      concluded: false,
      identifier: registerIdentifier,
      clientCode,
      responsibleCode
    }

    const { id } = await this.workflowPerformedModel.create(payload, {
      transaction
    })

    return id
  }

  /**
   * Atualiza o identificador do registro em um workflow performed
   * @param workflowPerformedId number
   * @param identifier number
   */
  async updateIdentifier(
    workflowPerformedId: number,
    identifier: number,
    transaction: Transaction
  ): Promise<void> {
    await this.workflowPerformedModel.update(
      { identifier },
      { where: { id: workflowPerformedId }, transaction }
    )
  }

  async findWorkflowTaskInProgress(
    id: number,
    userId: number,
    ignoreAccesses = false,
    trx?: Transaction,
    approver?: ApproverFilterDto
  ): Promise<WorkflowTaskInProgressDto> {
    const workflowPerformed = await this.workflowPerformedModel.findByPk(id, {
      transaction: trx
    })

    const lastResponse = await this.findLastWorkflowPerformedResponse(
      id,
      false,
      trx
    )

    const nextTaskOrder = !lastResponse
      ? 1
      : lastResponse.workflowTaskResponse.nextTaskOrder ??
        lastResponse.workflowTaskResponse.task.order + 1

    const workflowWithNextTask =
      await this.workflowsService.findWorkflowTaskByOrder(
        workflowPerformed.workflowId,
        nextTaskOrder,
        userId,
        trx
      )

    if (!workflowWithNextTask?.tasks?.length) return null

    const isReadOnly = !(await this.isUserAbleToAdvanceWorkflowTask(
      workflowWithNextTask,
      userId,
      trx,
      approver
    ))

    if (!ignoreAccesses && isReadOnly) return null

    const version = this.workflowsService.formatWorkflowVersion(
      WorkflowTypeEnum[workflowWithNextTask.workflowType.code],
      workflowWithNextTask.version,
      workflowWithNextTask.subversion
    )

    const [task] = workflowWithNextTask.tasks
    const responses = task.responses.map((response) => ({
      id: response.id,
      title: response.title,
      requiresJustification: response.requiresJustification
    }))

    return {
      version,
      task: task.title,
      responses,
      isReadOnly
    }
  }

  /**
   * Busca a última resposta da execução de um workflow
   * @param workflowPerformedId number
   */
  findLastWorkflowPerformedResponse(
    workflowPerformedId: number,
    concluded = false,
    transaction?: Transaction
  ): Promise<WorkflowPerformedResponse> {
    return this.workflowPerformedResponseModel.findOne({
      transaction,
      attributes: [['id', 'pk']],
      include: [
        {
          model: WorkflowPerformed,
          where: {
            id: workflowPerformedId,
            concluded
          }
        },
        {
          model: WorkflowTaskResponse,
          attributes: [
            'nextTaskOrder',
            'finishWorkflowSuccessfully',
            'finishWorkflowWithError'
          ],
          include: [
            {
              model: WorkflowTask,
              attributes: ['order']
            }
          ]
        }
      ],
      order: [[literal('\'pk\''), 'DESC']]
    })
  }

  /**
   * Valida se um usuario tem acesso para avançar a etapa atual um workflow
   * @param workflow Workflow
   */
  async isUserAbleToAdvanceWorkflowTask(
    workflow: Workflow,
    userId: number,
    transaction?: Transaction,
    hierarchyFilter?: ApproverFilterDto
  ): Promise<boolean> {
    const [task] = workflow.tasks

    if (task.allowApproverFromHierarchy && hierarchyFilter) {
      const isValidMemberCode = await this.validateMemberCode(
        hierarchyFilter.memberCode,
        hierarchyFilter.clientCode
      )

      const hierarchies = await this.hierarchyModel.findAll({
        attributes: ['id'],
        include: [
          {
            model: UserRepresentativeCode,
            where: {
              userId
            },
            attributes: []
          }
        ],
        where: {
          memberClassCode: task.hierarchyLevel,
          ...(hierarchyFilter.memberCode &&
            isValidMemberCode && { memberCode: hierarchyFilter.memberCode }),
          ...(hierarchyFilter.clientCode && {
            clientCode: hierarchyFilter.clientCode
          })
        }
      })

      return !!hierarchies.length
    }

    if (task.profile || task.user) return true

    if (!task.userAlternate) return false

    const workflowTask = await this.workflowsService.getWorkflowTaskUserById(
      task.id,
      transaction
    )

    if (!workflowTask || !workflowTask.user) return false

    const date = moment().utc()

    return (
      date > workflowTask.user.substituteUserStartDate &&
      date < workflowTask.user.substituteUserEndDate
    )
  }

  /**
   * Valida se um memberCode existe na hierarquia de um cliente
   * @param memberCode number
   * @param clientCode number
   * @returns Promise<boolean>
   */
  async validateMemberCode(
    memberCode?: number,
    clientCode?: number
  ): Promise<boolean> {
    if (!memberCode || !clientCode) return false

    const hierarchies = await this.hierarchyModel.findAll({
      where: {
        memberCode,
        clientCode
      }
    })

    return !!hierarchies.length
  }

  /**
   * Retorna a configuração das consultas de histórico de workflow
   */
  findWorkflowsHistoryQuery(): FindOptions {
    return {
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
              attributes: ['id'],
              include: [
                {
                  model: WorkflowTaskResponse,
                  attributes: ['title']
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
      ],
      order: [
        [{ model: WorkflowPerformed, as: 'workflowPerformed' }, 'id', 'DESC']
      ]
    }
  }

  /**
   * Formata um objeto WorkflowPerformed no formato de histórico
   * @param workflowPerformed WorkflowPerformed
   */
  formatWorkflowToHistory(
    workflowPerformed: WorkflowPerformed
  ): WorkflowPerformedHistoryDto {
    const [lastTask = null] =
      workflowPerformed.workflowPerformedResponses?.sort((a, b) =>
        a.id > b.id ? -1 : 1
      ) ?? []

    const workflowVersion = this.workflowsService.formatWorkflowVersion(
      WorkflowTypeEnum[workflowPerformed.workflow.workflowType.code],
      workflowPerformed.workflow.version,
      workflowPerformed.workflow.subversion
    )

    return {
      workflowPerformedId: workflowPerformed.id,
      requester: workflowPerformed.createdByUser.username,
      requestedAt: workflowPerformed.createdAt,
      lastResponseDescription: lastTask?.workflowTaskResponse.title ?? null,
      lastResponseResponder: lastTask?.createdByUser.username ?? null,
      workflowVersion,
      workflowType: workflowPerformed.workflow.workflowType.description
    }
  }

  /**
   * Retorna a configuração da consulta de histórico de execução de um workflow
   */
  findWorkflowsPerformedHistoryQuery(workflowPerformedId: number): FindOptions {
    return {
      include: [
        {
          model: WorkflowPerformed,
          attributes: ['createdAt', 'id'],
          required: true,
          where: {
            id: workflowPerformedId
          },
          include: [
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
  }

  /**
   * Formata um workflow em execução no formato de histórico de respostas
   * @param workflowPerformed WorkflowPerformed
   */
  formatWorkflowToPerformedHistory(
    workflowPerformed: WorkflowPerformed
  ): WorkflowPerformedResponseHistoryDto[] {
    const performedResponses =
      workflowPerformed?.workflowPerformedResponses?.sort((a, b) =>
        a.id > b.id ? -1 : 1
      ) ?? []

    const workflowVersion = this.workflowsService.formatWorkflowVersion(
      WorkflowTypeEnum[workflowPerformed.workflow.workflowType.code],
      workflowPerformed.workflow.version,
      workflowPerformed.workflow.subversion
    )

    return performedResponses.map((performedResponse) => ({
      workflowVersion,
      taskTitle: performedResponse.workflowTaskResponse.task.title,
      responseTitle: performedResponse.workflowTaskResponse.title,
      responder: performedResponse.createdByUser.username,
      justification: performedResponse.justification,
      respondedAt: performedResponse.createdAt
    }))
  }

  /**
   * Avança uma etapa de um workflow em execução e retorna se o workflow foi finalizado
   * @param workflowPerformedId number
   * @param userId number
   * @param data WorkflowPerformedResponseDto
   */
  async advanceWorkflow(
    workflowPerformedId: number,
    userId: number,
    data: WorkflowPerformedResponseDto,
    transaction: Transaction,
    approver?: ApproverFilterDto
  ): Promise<AdvanceWorkflowResultDto> {
    const workflowTaskInProgress = await this.findWorkflowTaskInProgress(
      workflowPerformedId,
      userId,
      false,
      transaction,
      approver
    )

    if (!workflowTaskInProgress) throw new ForbiddenException()

    const responseIdsInProgress = workflowTaskInProgress.responses.map(
      (response) => response.id
    )

    if (!responseIdsInProgress.includes(data.workflowTaskResponseId))
      throw new BadRequestException('A resposta selecionada é inválida')

    const workflowTaskResponse =
      await this.workflowsService.findWorkflowTaskResponseById(
        data.workflowTaskResponseId
      )

    if (workflowTaskResponse.requiresJustification && !data.justification)
      throw new BadRequestException(
        'A resposta selecionada requer uma justificativa'
      )

    await this.workflowPerformedResponseModel.create(
      {
        workflowPerformedId,
        workflowTaskResponseId: data.workflowTaskResponseId,
        createdBy: userId,
        createdAt: moment().utc(),
        justification: data.justification
      },
      { transaction }
    )

    const newTask = await this.findWorkflowTaskInProgress(
      workflowPerformedId,
      userId,
      true,
      transaction
    )

    if (
      !workflowTaskResponse.finishWorkflowSuccessfully &&
      !workflowTaskResponse.finishWorkflowWithError &&
      newTask
    )
      return {
        finished: false
      }

    await this.workflowPerformedModel.update(
      { concluded: true },
      {
        transaction,
        where: {
          id: workflowPerformedId
        }
      }
    )

    return {
      finished: true,
      finishedWithSuccess: !workflowTaskResponse.finishWorkflowWithError
    }
  }

  /**
   * Busca as atuais tarefas dos workflows
   * @param workflowTypeId number
   * @param workflowId number
   * @param workflowTaskId number
   * @param workflowPerformedId number
   * @returns Promise<WorkflowTasksInProgressDto[]>
   */
  getWorkflowTasksInProgress(
    workflowTypeId?: number,
    workflowId?: number,
    workflowTaskId?: number,
    workflowPerformedId?: number
  ): Promise<WorkflowTasksInProgressDto[]> {
    let whereClause = 'WHERE 1 = 1'
    if (workflowTypeId) whereClause += ` AND workflowTypeId = ${ workflowTypeId }`
    if (workflowId) whereClause += ` AND workflowId = ${ workflowId }`
    if (workflowTaskId) whereClause += ` AND workflowTaskId = ${ workflowTaskId }`
    if (workflowPerformedId)
      whereClause += ` AND workflowPerformedId = ${ workflowPerformedId }`

    return this.db.query<WorkflowTasksInProgressDto>(
      `SELECT * FROM vw_workflows_performed_current_task ${ whereClause }`,
      {
        type: QueryTypes.SELECT
      }
    )
  }
}
