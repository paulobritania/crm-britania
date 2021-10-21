import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { FindOptions, Transaction, fn, col, QueryTypes, Order } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { isNumber } from 'lodash'

import { getUtcDate } from '../../utils/dates/dateUtils'
import { OrderBySortEnum } from '../../utils/pagination/orderByDirection.enum'
import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { Access } from '../accesses/entities/access.entity'
import { Field } from '../fields/entities/field.entity'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { Profile } from '../profiles/entities/profile.entity'
import { User } from '../users/entities/user.entity'
import { UserProfile } from '../users/entities/userProfile.entity'
import { CreateWorkflowDto } from './dtos/create/createWorkflow.dto'
import { CreateWorkflowTaskDto } from './dtos/create/createWorkflowTask.dto'
import { CreateWorkflowTaskConditionDto } from './dtos/create/createWorkflowTaskCondition.dto'
import { CreateWorkflowTaskResponseDto } from './dtos/create/createWorkflowTaskResponse.dto'
import { ListWorkflowDto } from './dtos/findAll/listWorkflow.dto'
import { WorkflowsQueryDto } from './dtos/findAll/workflowQuery.dto'
import { WorkflowDto } from './dtos/findById/workflow.dto'
import { WorkflowTaskDto } from './dtos/findById/workflowTask.dto'
import { WorkflowTaskConditionDto } from './dtos/findById/workflowTaskCondition.dto'
import { WorkflowTaskResponseDto } from './dtos/findById/workflowTaskResponse.dto'
import { SlaDto } from './dtos/findSLAs/sla.dto'
import { SlaQuery } from './dtos/findSLAs/slaQuery.dto'
import { ListWorkTaskDto } from './dtos/listWorkFlowTask.dto'
import { ListWorkflowVersionDto } from './dtos/listWorkFlowVersion.dto'
import { SlaPreviewDto } from './dtos/slaPreview.dto'
import { UpdateWorkflowDto } from './dtos/update/updateWorkflow.dto'
import { UserAvailableWorkflowTaskViewDto } from './dtos/userAvailableWorkflowTaskView.dto'
import { WorkflowTypeDto } from './dtos/workflowType.dto'
import { Workflow } from './entities/workflow.entity'
import { WorkflowHistory } from './entities/workflowHistory.entity'
import { WorkflowTask } from './entities/workflowTask.entity'
import { WorkflowTaskCondition } from './entities/workflowTaskCondition.entity'
import { WorkflowTaskResponse } from './entities/workflowTaskResponse.entity'
import { WorkflowType } from './entities/workflowType.entity'
import { WorkflowTypeAccess } from './entities/workflowTypesAccess.entity'
import { SlaExpirationIndicatorEnum } from './enum/slaExpirationTime.enum'
import { SlaOrderByOptionsEnum } from './enum/slaOrderByOptions.enum'
import { WorkflowOrderByOptions } from './enum/workflowOrderByOptions.enum'
import { WorkflowStatusEnum } from './enum/workflowStatus.enum'
import { WorkflowTypeEnum } from './enum/workflowType.enum'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment-timezone')

type CreateWorkflowTaskCondition = {
  workflowTaskId: number
} & CreateWorkflowTaskConditionDto
type CreateWorkflowTaskResponse = {
  workflowTaskId: number
} & CreateWorkflowTaskResponseDto

@Injectable()
export class WorkflowsService {
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Workflow) private workflowModel: typeof Workflow,
    @InjectModel(WorkflowTask) private workflowTask: typeof WorkflowTask,
    @InjectModel(WorkflowTaskCondition)
    private workflowTaskCondition: typeof WorkflowTaskCondition,
    @InjectModel(WorkflowTaskResponse)
    private workflowTaskResponse: typeof WorkflowTaskResponse,
    @InjectModel(WorkflowType) private workflowType: typeof WorkflowType,
    @InjectModel(WorkflowTypeAccess)
    private workflowTypeAccess: typeof WorkflowTypeAccess,
    @InjectModel(WorkflowHistory)
    private workflowHistory: typeof WorkflowHistory,
    @InjectModel(Hierarchy)
    private hierarchy: typeof Hierarchy
  ) {}

  /**
   * Atualiza um workflow, desativando o atual e criando um novo registro com uma nova versão
   * @param id number
   * @param data UpdateWorkflowDto
   * @param userId number
   */
  async update(
    id: number,
    data: UpdateWorkflowDto,
    userId: number
  ): Promise<number> {
    const transaction = await this.db.transaction()

    try {
      await this.deactivate(id, userId, transaction)

      const oldWorkflow = (
        await this.findByIdWithIncludes(id, transaction)
      ).toJSON() as Workflow

      const newWorkflow: CreateWorkflowDto = {
        ...data,
        typeId: oldWorkflow.typeId
      }

      const newId = await this.create(
        newWorkflow,
        userId,
        oldWorkflow.version,
        transaction
      )

      await this.compareAndSaveHistory(
        oldWorkflow,
        newWorkflow,
        newId,
        transaction
      )

      await transaction.commit()

      return newId
    } catch (error) {
      await transaction.rollback()

      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o fluxo de trabalho'
      )
    }
  }

  /**
   * Compara os dados atualizados de um workflow e atualiza o histórico
   * @param oldWorkflow Workflow
   * @param newWorkflow CreateWorkflowDto
   * @param newWorkflowId number
   * @param transaction Transaction
   */
  async compareAndSaveHistory(
    oldWorkflow: Workflow,
    newWorkflow: CreateWorkflowDto,
    newWorkflowId: number,
    transaction: Transaction
  ): Promise<void> {
    const updatedFields = this.getUpdatedFields(oldWorkflow, newWorkflow)

    await this.saveHistory(newWorkflowId, updatedFields.join(', '), transaction)
  }

  /**
   * Insere dados no histórico
   * @param workflowId number
   * @param updatedFields string
   * @param transaction Transaction
   */
  async saveHistory(
    workflowId: number,
    updatedFields: string,
    transaction: Transaction
  ): Promise<void> {
    await this.workflowHistory.create(
      { workflowId, updatedFields },
      { transaction }
    )
  }

  /**
   * Compara os campos atualizados de um workflow e retorna um array com as atualizações realizadas.
   * @param oldWorkflow Workflow
   * @param newWorkflow CreateWorkflowDto
   */
  getUpdatedFields(
    oldWorkflow: Workflow,
    newWorkflow: CreateWorkflowDto
  ): string[] {
    const updatedFields: string[] = []

    const { tasks: oldTasks } = oldWorkflow
    const { tasks: newTasks } = newWorkflow

    const oldDateStart = moment(oldWorkflow.dateStart)
      .tz('America/Sao_Paulo')
      .startOf('day')
      .utc()
      .format()
    const oldDateEnd = moment(oldWorkflow.dateEnd)
      .tz('America/Sao_Paulo')
      .endOf('day')
      .utc()
      .format()
    const newDateStart = moment(newWorkflow.dateStart)
      .tz('America/Sao_Paulo')
      .startOf('day')
      .utc()
      .format()
    const newDateEnd = moment(newWorkflow.dateEnd)
      .tz('America/Sao_Paulo')
      .endOf('day')
      .utc()
      .format()

    if (oldWorkflow.title.trim() !== newWorkflow.title.trim())
      updatedFields.push('Título')
    if (oldWorkflow.description.trim() !== newWorkflow.description.trim())
      updatedFields.push('Descrição')
    if (oldDateStart !== newDateStart || oldDateEnd !== newDateEnd)
      updatedFields.push('Validade')

    if (oldTasks.length < newTasks.length)
      updatedFields.push(
        `${ newTasks.length - oldTasks.length } nova(s) tarefa(s) adicionada(s)`
      )
    else if (oldTasks.length > newTasks.length)
      updatedFields.push(
        `${ oldTasks.length - newTasks.length } tarefa(s) removida(s)`
      )

    const updatedTasks = this.getTaskUpdatedFields(oldTasks, newTasks)

    if (updatedTasks.length > 2) {
      const [firstChange, secondChange, ...rest] = updatedTasks

      const restMessage = `Mais ${ rest.length } tarefa(s) atualizada(s)`
      updatedFields.push(firstChange, secondChange, restMessage)
    } else {
      updatedFields.push(...updatedTasks)
    }

    return updatedFields
  }

  /**
   * Compara os campos atualizados de tarefas e retorna um array com as atualizações realizadas.
   * @param oldTasks WorkflowTask[]
   * @param newTasks CreateWorkflowTaskDto[]
   */
  getTaskUpdatedFields(
    oldTasks: WorkflowTask[],
    newTasks: CreateWorkflowTaskDto[]
  ): string[] {
    const updatedTasks: string[] = []
    oldTasks.forEach((oldTask) => {
      const [newTask] = newTasks.filter((task) => task.order === oldTask.order)

      if (!newTask) return

      const message = `Tarefa '${ oldTask.title }' alterada`

      if (
        oldTask.conditions.length !== newTask.conditions.length ||
        oldTask.responses.length !== newTask.responses.length ||
        oldTask.title.trim() !== newTask.title.trim() ||
        oldTask.deadline !== newTask.deadline ||
        oldTask.profileId !== newTask.profileId ||
        oldTask.userId !== newTask.userId ||
        oldTask.userAlternateId !== newTask.userAlternateId
      ) {
        updatedTasks.push(message)
        return
      }

      const { conditions: oldConditions } = oldTask
      const { conditions: newConditions } = newTask
      const { responses: oldResponses } = oldTask
      const { responses: newResponses } = newTask

      if (
        this.checkIfConditionsHasUpdatedFields(oldConditions, newConditions) ||
        this.checkIfResponsesHasUpdatedFields(oldResponses, newResponses)
      )
        updatedTasks.push(message)
    })

    return updatedTasks
  }

  /**
   * Valida se há campos atualizados nas condições
   * @param oldConditions WorkflowTaskCondition[]
   * @param newConditions CreateWorkflowTaskConditionDto[]
   */
  checkIfConditionsHasUpdatedFields(
    oldConditions: WorkflowTaskCondition[],
    newConditions: CreateWorkflowTaskConditionDto[]
  ): boolean {
    return !oldConditions.every((oldCondition) => {
      const [newCondition] = newConditions.filter(
        (condition) => condition.order === oldCondition.order
      )

      if (
        !newCondition ||
        oldCondition.title.trim() !== newCondition.title.trim() ||
        oldCondition.comparisonSymbol !== newCondition.comparisonSymbol ||
        oldCondition.comparisonValue !== newCondition.comparisonValue ||
        oldCondition.fieldId !== newCondition.fieldId
      )
        return false

      return true
    })
  }

  /**
   * Valida se há campos atualizados nas respostas
   * @param oldConditions WorkflowTaskResponse[]
   * @param newConditions CreateWorkflowTaskResponseDto[]
   */
  checkIfResponsesHasUpdatedFields(
    oldResponses: WorkflowTaskResponse[],
    newResponses: CreateWorkflowTaskResponseDto[]
  ): boolean {
    return !oldResponses.every((oldResponse) => {
      const [newResponse] = newResponses.filter(
        (condition) => condition.order === oldResponse.order
      )

      if (
        !newResponse ||
        oldResponse.title.trim() !== newResponse.title.trim() ||
        oldResponse.requiresJustification !==
          newResponse.requiresJustification ||
        oldResponse.nextTaskOrder !== newResponse.nextTaskOrder
      )
        return false

      return true
    })
  }

  /**
   * Desativa o workflow informado, caso ele esteja ativo
   * @param id number
   * @param userId number
   * @param trx Transaction
   */
  async deactivate(
    id: number,
    userId: number,
    trx?: Transaction
  ): Promise<void> {
    const transaction = trx || (await this.db.transaction())

    const workflow = await this.workflowModel.findByPk(id, { transaction })

    if (!workflow)
      throw new BadRequestException({
        errorCode: 'WORKFLOW_NOT_FOUND',
        message: 'Fluxo de trabalho não encontrado'
      })
    if (workflow.active === false)
      throw new BadRequestException({
        errorCode: 'WORKFLOW_ALREADY_INACTIVE',
        message: 'Este fluxo de trabalho já está inativo'
      })

    try {
      await this.workflowModel.update(
        { active: false, updatedBy: userId },
        {
          where: { id },
          transaction
        }
      )

      if (!trx) await transaction.commit()
    } catch (error) {
      if (!trx) await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um arro ao inativar o fluxo de trabalho'
      )
    }
  }

  /**
   * Busca um workflow por id
   * @param id number
   */
  async findById(id: number): Promise<WorkflowDto> {
    const workflowData = await this.findByIdWithIncludes(id)

    if (!workflowData) return undefined

    const { tasks, workflowType, version, subversion, ...workflow } =
      workflowData.toJSON() as Workflow

    const histories = await this.getWorkflowHistories(
      workflowType.id,
      version,
      subversion
    )

    return {
      title: workflow.title,
      description: workflow.description,
      type: workflowType.description,
      active: workflow.active,
      dateStart: workflow.dateStart,
      dateEnd: workflow.dateEnd,
      lastUpdateDate: workflow.updatedAt || workflow.createdAt,
      lastUpdateLogin:
        workflow.updatedByUser?.username || workflow.createdByUser?.username,
      version: this.formatWorkflowVersion(
        WorkflowTypeEnum[workflowType.code],
        version,
        subversion
      ),
      tasks: tasks.map(
        (task) =>
          ({
            title: task.title,
            deadline: task.deadline,
            profile: {
              id: task.profile.id,
              name: task.profile.name
            },
            user: task.user
              ? {
                  id: task.user.id,
                  name: task.user.username
                }
              : null,
            userAlternate: task.userAlternate
              ? {
                  id: task.userAlternate.id,
                  name: task.userAlternate.username
                }
              : null,
            order: task.order,
            userAlternateId: task.userAlternateId,
            userId: task.userId,
            conditions: task.conditions.map(
              (condition) =>
                ({
                  title: condition.title,
                  order: condition.order,
                  field: {
                    id: condition.field.id,
                    alias: condition.field.alias,
                    name: condition.field.name,
                    access: {
                      id: condition.field.access.id,
                      name: condition.field.access.name,
                      alias: condition.field.access.alias
                    }
                  },
                  comparisonSymbol: condition.comparisonSymbol,
                  comparisonValue: condition.comparisonValue
                } as WorkflowTaskConditionDto)
            ),
            responses: task.responses.map(
              (response) =>
                ({
                  title: response.title,
                  order: response.order,
                  requiresJustification: response.requiresJustification,
                  nextTaskOrder: response.nextTaskOrder,
                  finishWorkflowSuccessfully:
                    response.finishWorkflowSuccessfully,
                  finishWorkflowWithError: response.finishWorkflowWithError
                } as WorkflowTaskResponseDto)
            )
          } as WorkflowTaskDto)
      ),
      histories: histories.map((history) => ({
        updatedAt: history.workflow.createdAt,
        updatedBy: history.workflow.createdByUser.username,
        updatedFields: history.updatedFields,
        version: this.formatWorkflowVersion(
          WorkflowTypeEnum[workflowType.code],
          version,
          history.workflow.subversion
        )
      })),
      status: this.getWorkflowStatus(
        workflow.active,
        workflow.dateStart,
        workflow.dateEnd
      )
    } as WorkflowDto
  }

  /**
   * Lista os workflows baseado nos filtros informados
   * @param query WorkflowsQueryDto
   */
  async findAll(query: WorkflowsQueryDto): Promise<ListWorkflowDto[]> {
    const hasStartAndEndDate = query.dateStart && query.dateEnd

    const queryOptions: FindOptions = {
      where: {
        ...(query.title && { title: { $like: `%${ query.title }%` } }),
        ...(query.status &&
          query.status === WorkflowStatusEnum.INACTIVE && {
            active: false
          }),
        ...(query.status &&
          query.status === WorkflowStatusEnum.ACTIVE && {
            active: true,
            dateStart: {
              $lowerOrEqualThen: moment().utc()
            },
            dateEnd: {
              $greaterOrEqualThen: moment().utc()
            }
          }),
        ...(query.status &&
          query.status === WorkflowStatusEnum.PROGRAMMED && {
            active: true,
            dateStart: {
              $greaterOrEqualThen: moment().utc()
            }
          }),
        ...(query.status &&
          query.status === WorkflowStatusEnum.EXPIRED && {
            active: true,
            dateEnd: {
              $lowerThen: moment().utc()
            }
          }),
        ...(hasStartAndEndDate && {
          dateStart: {
            $greaterOrEqualThen: moment(query.dateStart).startOf('day').utc()
          },
          dateEnd: {
            $lowerOrEqualThen: moment(query.dateEnd).endOf('day').utc()
          }
        }),
        ...(!hasStartAndEndDate &&
          query.dateStart && {
            dateStart: {
              $greaterOrEqualThen: moment(query.dateStart).startOf('day').utc()
            }
          }),
        ...(!hasStartAndEndDate &&
          query.dateEnd && {
            dateEnd: {
              $lowerOrEqualThen: moment(query.dateEnd).endOf('day').utc()
            }
          }),
        ...(query.typeId && { typeId: parseInt(query.typeId, 10) })
      },
      ...(query.offset && { offset: parseInt(query.offset, 10) }),
      ...(query.limit && { limit: parseInt(query.limit, 10) }),
      order: this.getWorkflowOrderBy(query.orderBy, query.orderBySort)
    }

    const workflows = await this.workflowModel.findAll({
      ...queryOptions,
      attributes: [
        'id',
        'title',
        'version',
        'dateStart',
        'dateEnd',
        'active',
        'subversion'
      ],
      include: [
        {
          model: WorkflowType,
          as: 'workflowType',
          attributes: ['description', 'code']
        }
      ]
    })

    return workflows.map((workflow) => {
      const { workflowType, version, subversion, active, ...data } =
        workflow.toJSON() as Workflow

      const status = this.getWorkflowStatus(
        active,
        data.dateStart,
        data.dateEnd
      )

      return {
        ...data,
        type: workflowType.description,
        version: this.formatWorkflowVersion(
          WorkflowTypeEnum[workflowType.code],
          version,
          subversion
        ),
        status
      } as ListWorkflowDto
    })
  }

  /**
   * Monta a clausula order by
   * @param orderBy WorkflowOrderByOptions
   * @param sort OrderBySortEnum
   * @returns Order
   */
  getWorkflowOrderBy(
    orderBy?: WorkflowOrderByOptions,
    sort?: OrderBySortEnum
  ): Order {
    if (!orderBy) return [['id', 'DESC']]

    if (orderBy === WorkflowOrderByOptions.TYPE)
      return [
        [
          { model: WorkflowType, as: 'workflowType' },
          'description',
          sort || 'ASC'
        ],
        ['id', 'DESC']
      ]

    if (orderBy === WorkflowOrderByOptions.STATUS)
      return [
        ['active', sort || 'ASC'],
        ['dateStart', sort || 'ASC'],
        ['id', 'DESC']
      ]

    return [
      [orderBy, sort || 'ASC'],
      ['id', 'DESC']
    ]
  }

  /**
   * Retorna o status de um workflow
   * @param active boolean
   * @param dateStart string
   * @param dateEnd string
   * @returns WorkflowStatusEnum
   */
  getWorkflowStatus(
    active: boolean,
    dateStart: string,
    dateEnd: string
  ): WorkflowStatusEnum {
    const currentDate = getUtcDate()
    if (!active) return WorkflowStatusEnum.INACTIVE

    if (currentDate > dateEnd) return WorkflowStatusEnum.EXPIRED

    return currentDate > dateStart && currentDate < dateEnd
      ? WorkflowStatusEnum.ACTIVE
      : WorkflowStatusEnum.PROGRAMMED
  }

  /**
   * Cria um workflow
   * @param data CreateWorkflowDto
   * @param userId number
   * @param version number
   * @param trx Transaction
   * @returns Promise<number>
   */
  async create(
    data: CreateWorkflowDto,
    userId: number,
    version?: number,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())

    try {
      const { tasks, dateStart: start, dateEnd: end, ...workflowData } = data
      const dateStart = moment(start)
        .tz('America/Sao_Paulo')
        .startOf('day')
        .utc()
      const dateEnd = moment(end).tz('America/Sao_Paulo').endOf('day').utc()

      if (!dateStart.isValid() || !dateEnd.isValid())
        throw new BadRequestException('As datas informadas são inválidas')

      const workflowType = await this.findWorkflowTypeById(
        data.typeId,
        transaction
      )
      if (!workflowType)
        throw new BadRequestException({
          errorCode: 'WORKFLOW_INVALID_TYPE',
          message: 'O tipo do fluxo de trabalho informado é inválido'
        })

      const newVersion =
        version ||
        (await this.generateWorkflowVersion(data.typeId, transaction))
      const subversion = await this.generateWorkflowSubversion(
        data.typeId,
        version,
        transaction
      )

      const workflow = {
        ...workflowData,
        active: true,
        version: newVersion,
        subversion,
        dateStart,
        dateEnd,
        createdBy: userId
      }

      await this.validateWorkflowPeriod(
        workflow.typeId,
        workflow.dateStart,
        workflow.dateEnd,
        transaction
      )

      const { id } = await this.workflowModel.create(workflow, {
        transaction
      })

      await this.createTasks(id, tasks, transaction)

      if (!version) await this.saveHistory(id, 'Workflow criado', transaction)

      if (!trx) await transaction.commit()

      return id
    } catch (err) {
      if (!trx) await transaction.rollback()
      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro ao cadastrar o fluxo de trabalho'
      )
    }
  }

  /**
   * Cria as tarefas de um workflow
   * @param id number
   * @param data CreateWorkflowTaskDto[]
   */
  async createTasks(
    workflowId: number,
    data: CreateWorkflowTaskDto[],
    transaction: Transaction
  ): Promise<void> {
    const tasks = data.map((task) => ({ ...task, workflowId }))
    const orders = tasks.map((task) => task.order)
    const titles = tasks.map((task) => task.title)
    const hierarchyLevels = [
      ...new Set(
        tasks
          .filter((task) => task.allowApproverFromHierarchy)
          .map((task) => task.hierarchyLevel)
      )
    ]

    this.validateOrders(orders)
    this.validateTitles(titles)
    await this.validateTaskHierarchyLevels(hierarchyLevels)

    const allConditions: CreateWorkflowTaskCondition[] = []
    const allResponses: CreateWorkflowTaskResponse[] = []

    await Promise.all(
      tasks.map(async (taskData) => {
        const { conditions, responses, ...task } = taskData

        const responseOrders = responses.map((response) => response.order)
        const conditionOrders = conditions.map((condition) => condition.order)

        const responseTitles = responses.map((response) => response.title)

        this.validateOrders(responseOrders)
        this.validateOrders(conditionOrders)
        this.validateTitles(responseTitles)

        const { id: workflowTaskId } = await this.workflowTask.create(task, {
          transaction
        })

        if (conditions && conditions.length)
          allConditions.push(
            ...conditions.map((condition) => ({ ...condition, workflowTaskId }))
          )

        allResponses.push(
          ...responses.map((response) => ({ ...response, workflowTaskId }))
        )
      })
    )

    const responsesNextTaskOrders = allResponses
      .filter((response) => isNumber(response.nextTaskOrder))
      .map((response) => response.nextTaskOrder)

    this.validateResponsesNextTaskOrders(orders, responsesNextTaskOrders)

    await this.createConditions(allConditions, transaction)
    await this.createResponses(allResponses, transaction)
  }

  /**
   * Cria respostas de uma tarefa
   * @param id number
   * @param data CreateWorkflowTaskResponse[]
   */
  async createResponses(
    responses: CreateWorkflowTaskResponse[],
    transaction: Transaction
  ): Promise<void> {
    await this.workflowTaskResponse.bulkCreate(responses, { transaction })
  }

  /**
   * Cria condições de uma tarefa
   * @param id number
   * @param data CreateWorkflowTaskConditions[]
   */
  async createConditions(
    conditions: CreateWorkflowTaskCondition[],
    transaction: Transaction
  ): Promise<void> {
    await this.workflowTaskCondition.bulkCreate(conditions, { transaction })
  }

  /**
   * Lista os tipos de workflow
   */
  async getTypes(): Promise<WorkflowTypeDto[]> {
    return this.workflowType.findAll({
      attributes: ['id', 'code', 'description'],
      order: [['description', 'asc']]
    })
  }

  /**
   * Lista os acessos de um tipo de workflow
   * @param typeId number
   */
  async getWorkflowTypeAccess(typeId: number): Promise<Access[]> {
    const typeAccesses = await this.workflowTypeAccess.findAll({
      where: { workflowTypeId: typeId },
      attributes: ['id'],
      include: [
        {
          model: Access,
          attributes: ['id', 'name', 'alias']
        }
      ]
    })

    return typeAccesses.map((type: WorkflowTypeAccess) => type.access)
  }

  /**
   * Busca a última versão de um tipo de workflow
   * @param typeId number
   * @param transaction Transaction
   */
  async getWorkflowLastVersion(
    typeId: number,
    transaction?: Transaction
  ): Promise<number | undefined> {
    const workflow = await this.workflowModel.findOne({
      attributes: [[fn('max', col('version')), 'version']],
      where: { typeId },
      order: ['type_id'],
      group: ['type_id'],
      transaction
    })

    return workflow?.version
  }

  /**
   * Busca a última subversão de uma versão de um tipo de workflow
   * @param typeId number
   * @param version number
   * @param transaction Transaction
   */
  async getWorkflowLastSubversion(
    typeId: number,
    version: number,
    transaction: Transaction
  ): Promise<number> {
    const workflow = await this.workflowModel.findOne({
      attributes: [[fn('max', col('subversion')), 'subversion']],
      where: { typeId, version },
      order: ['type_id'],
      group: ['type_id'],
      transaction
    })

    return workflow?.subversion
  }

  /**
   * Busca um workflow por id com todos seus relacionamentos
   * @param id number
   * @param transaction Transaction
   * @returns
   */
  findByIdWithIncludes(
    id: number,
    transaction?: Transaction
  ): Promise<Workflow> {
    return this.workflowModel.findByPk(id, {
      transaction,
      include: [
        {
          model: User,
          as: 'createdByUser',
          association: 'createdByUser',
          attributes: ['username'],
          paranoid: false
        },
        {
          model: User,
          as: 'updatedByUser',
          association: 'updatedByUser',
          attributes: ['username'],
          paranoid: false
        },
        {
          model: WorkflowType,
          attributes: ['id', 'description', 'code']
        },
        {
          model: WorkflowTask,
          attributes: [
            'title',
            'order',
            'profileId',
            'userId',
            'userAlternateId',
            'deadline'
          ],
          include: [
            {
              model: WorkflowTaskCondition,
              attributes: [
                'title',
                'order',
                'fieldId',
                'comparisonSymbol',
                'comparisonValue'
              ],
              include: [
                {
                  model: Field,
                  attributes: ['id', 'name', 'alias', 'accessId'],
                  include: [
                    {
                      model: Access,
                      attributes: ['id', 'name', 'alias']
                    }
                  ]
                }
              ]
            },
            {
              model: WorkflowTaskResponse,
              attributes: [
                'title',
                'order',
                'requiresJustification',
                'nextTaskOrder',
                'finishWorkflowSuccessfully',
                'finishWorkflowWithError'
              ]
            },
            {
              model: Profile,
              attributes: ['id', 'name'],
              paranoid: false
            },
            {
              model: User,
              as: 'user',
              association: 'user',
              attributes: ['id', 'username'],
              paranoid: false
            },
            {
              model: User,
              as: 'userAlternate',
              association: 'userAlternate',
              attributes: ['id', 'username'],
              paranoid: false
            }
          ]
        }
      ]
    })
  }

  /**
   * Busca o histórico de alterações de um determinado tipo e versão de um workflow
   * @param typeId number
   * @param version number
   * @param subversion number
   * @returns
   */
  async getWorkflowHistories(
    typeId: number,
    version: number,
    subversion: number
  ): Promise<WorkflowHistory[]> {
    return (
      await this.workflowHistory.findAll({
        include: [
          {
            model: Workflow,
            attributes: ['createdAt', 'subversion'],
            required: true,
            where: {
              typeId,
              version,
              subversion: { $lowerOrEqualThen: subversion }
            },
            include: [
              {
                model: User,
                as: 'createdByUser',
                association: 'createdByUser',
                attributes: ['username'],
                paranoid: false
              }
            ]
          }
        ],
        order: [['workflowId', 'DESC']]
      })
    ).map((history) => history.toJSON() as WorkflowHistory)
  }

  /**
   * Busca um tipo de workflow por id
   * @param id number
   */
  findWorkflowTypeById(
    id: number,
    transaction?: Transaction
  ): Promise<WorkflowType> {
    return this.workflowType.findByPk(id, {
      attributes: ['id', 'code', 'description'],
      transaction
    })
  }

  /**
   * Gera a versão de um workflow
   * @param version number?
   */
  async generateWorkflowVersion(
    typeId: number,
    transaction?: Transaction
  ): Promise<number> {
    const workflowLastVersion = await this.getWorkflowLastVersion(
      typeId,
      transaction
    )

    return workflowLastVersion ? workflowLastVersion + 1 : 1
  }

  /**
   * Gera a subversão de um workflow
   * @param version number?
   */
  async generateWorkflowSubversion(
    typeId: number,
    version?: number,
    transaction?: Transaction
  ): Promise<number> {
    if (!version) return 0

    const workflowLastSubversion = await this.getWorkflowLastSubversion(
      typeId,
      version,
      transaction
    )

    return workflowLastSubversion + 1
  }

  /**
   * Formata a versão de um workflow de acordo com seu tipo
   * @param type WorkflowTypeEnum
   * @param version number
   */
  formatWorkflowVersion(
    type: WorkflowTypeEnum,
    version: number,
    subversion: number
  ): string {
    return `${ type }.${ version }.${ String(subversion).padStart(2, '0') }`
  }

  /**
   * Valida as próximas tarefas informadas nas respostas
   * @param tasksOrder number[]
   * @param responsesNextTaskOrders number[]
   */
  validateResponsesNextTaskOrders(
    tasksOrders: number[],
    responsesNextTaskOrders: number[]
  ): void {
    responsesNextTaskOrders.forEach((nextTaskOrders) => {
      if (!tasksOrders.includes(nextTaskOrders))
        throw new BadRequestException({
          errorCode: 'WORKFLOW_INVALID_NEXT_TASK_ORDER',
          message: `A próxima tarefa de número ${ nextTaskOrders } é inválida`
        })
    })
  }

  /**
   * Valida as ordens informadas nas tarefas, respostas ou condições
   * @param orders number[]
   */
  validateOrders(orders: number[]): void {
    let count = 1
    orders
      .sort((a, b) => a - b)
      .forEach((num) => {
        if (count !== num)
          throw new BadRequestException({
            errorCode: 'WORKFLOW_INVALID_ORDERS',
            message: `As tarefas ou respostas não estão em ordem correta (${ num })`
          })
        count += 1
      })
  }

  /**
   * Valida os títulos, para que não haja repetições
   * @param id number
   * @param data UpdateWorkflowDto
   */
  validateTitles(titles: string[]): void {
    const titlesSet = new Set(titles.map((title) => title.trim()))
    if (titlesSet.size === titles.length) return

    const repeatedTitles = Array.from(titlesSet).filter(
      (titleSet) =>
        titles.filter((title) => title.trim() === titleSet).length > 1
    )

    throw new BadRequestException({
      errorCode: 'WORKFLOW_INVALID_TITLES',
      message: 'Os títulos não devem ser iguais',
      details: repeatedTitles
    })
  }

  /**
   * Valida se os valores passados correspondem a um nível hierárquico válido
   * @param hierarchyLevels number[]
   */
  async validateTaskHierarchyLevels(hierarchyLevels: number[]): Promise<void> {
    await Promise.all(
      hierarchyLevels.map(async (memberClassCode) => {
        const hierarchy = await this.hierarchy.findOne({
          where: {
            memberClassCode
          },
          attributes: ['id']
        })

        if (!hierarchy)
          throw new BadRequestException(
            `O nível hierárquico de código ${ memberClassCode } é inválido`
          )
      })
    )
  }

  /**
   * Valida se o período informado na criação e atualização de um workflow já está em uso por algum workflow ativo do mesmo tipo
   * @param typeId number
   * @param dateStart Date
   * @param dateEnd Date
   */
  async validateWorkflowPeriod(
    typeId: number,
    dateStart: Date,
    dateEnd: Date,
    transaction?: Transaction
  ): Promise<void> {
    const start = moment(dateStart).tz('America/Sao_Paulo').startOf('day').utc()
    const end = moment(dateEnd).tz('America/Sao_Paulo').endOf('day').utc()
    const period = [start, end]

    const workflow = await this.workflowModel.findOne({
      where: {
        active: true,
        typeId,
        $or: [
          { dateStart: { $between: period } },
          { dateEnd: { $between: period } },
          {
            $and: [
              { dateStart: { $lowerThen: start } },
              { dateEnd: { $greaterThen: end } }
            ]
          }
        ]
      },
      transaction
    })

    if (workflow)
      throw new BadRequestException({
        errorCode: 'WORKFLOW_INVALID_SHELF_LIFE',
        message: 'O período informado já está em uso'
      })
  }

  /**
   * Irá listar todas as tarefas de um workFlow
   * @param workflowId number
   */
  async getWorkFlowTasks(workflowId: number): Promise<ListWorkTaskDto[]> {
    const workFlow = await this.workflowModel.findByPk(workflowId, {
      attributes: ['id'],
      include: [
        {
          model: this.workflowTask,
          association: 'tasks',
          attributes: ['id', 'title'],
          required: false
        }
      ]
    })

    if (!workFlow)
      throw new BadRequestException('Fluxo de trabalho não encontrado')

    return workFlow.tasks
  }

  /**
   * irá buscar todas as versões de um tipo de workflow
   * @param workflowId number
   */
  async getWorkFlowVersionsByType(
    typeId?: number,
    typeEnum?: WorkflowTypeEnum
  ): Promise<ListWorkflowVersionDto[]> {
    const workFlowType = await this.workflowType.findOne({
      where: {
        ...(typeId && { id: typeId }),
        ...(typeEnum && { code: typeEnum })
      },
      attributes: ['id', 'code'],
      raw: true
    })

    if (!workFlowType)
      throw new BadRequestException('Tipo de fluxo de trabalho não encontrado')

    const workFlows = await this.workflowModel.findAll({
      where: {
        typeId: workFlowType.id
      },
      attributes: ['id', 'version', 'subversion']
    })

    return workFlows.map((workFlow) => ({
      id: workFlow.id,
      version: this.formatWorkflowVersion(
        WorkflowTypeEnum[workFlowType.code],
        workFlow.version,
        workFlow.subversion
      )
    }))
  }

  /**
   * Busca o id de um tipo de workflow através de seu alias
   * @param workflowTypeEnum WorkflowTypeEnum
   */
  getWorkflowTypeId(
    workflowTypeEnum: WorkflowTypeEnum,
    transaction?: Transaction
  ): Promise<WorkflowType> {
    return this.workflowType.findOne({
      attributes: ['id'],
      where: {
        code: workflowTypeEnum
      },
      transaction
    })
  }

  /**
   * Busca o id do workflow ativo por tipo do workflow
   * @param workflowTypeId number
   */
  getWorkflowIdInProgress(
    workflowTypeId: number,
    transaction?: Transaction
  ): Promise<Workflow> {
    return this.workflowModel.findOne({
      attributes: ['id'],
      where: {
        typeId: workflowTypeId,
        active: true,
        dateStart: {
          $lowerOrEqualThen: moment().utc()
        },
        dateEnd: {
          $greaterOrEqualThen: moment().utc()
        }
      },
      transaction
    })
  }

  /**
   * Busca a tarefa de um workflow baseado em sua ordem
   * @param workflowId number
   * @param order number
   * @param userId number
   */
  findWorkflowTaskByOrder(
    workflowId: number,
    order: number,
    userId: number,
    transaction?: Transaction
  ): Promise<Workflow> {
    return this.workflowModel.findByPk(workflowId, {
      transaction,
      attributes: ['version', 'subversion'],
      include: [
        {
          model: WorkflowType,
          attributes: ['code'],
          required: true
        },
        {
          model: WorkflowTask,
          attributes: [
            'id',
            'order',
            'title',
            'allowApproverFromHierarchy',
            'hierarchyLevel'
          ],
          required: true,
          where: {
            order
          },
          include: [
            {
              required: false,
              model: Profile,
              attributes: ['id'],
              include: [
                {
                  model: UserProfile,
                  where: { userId },
                  attributes: []
                }
              ]
            },
            {
              required: false,
              model: User,
              as: 'user',
              association: 'user',
              attributes: ['id'],
              where: { id: userId }
            },
            {
              required: false,
              model: User,
              as: 'userAlternate',
              association: 'userAlternate',
              attributes: ['id'],
              where: { id: userId }
            },
            {
              model: WorkflowTaskResponse,
              required: true,
              attributes: ['id', 'title', 'requiresJustification']
            }
          ]
        }
      ]
    })
  }

  /**
   * Busca os dados do usuario de uma tarefa
   * @param id number
   */
  getWorkflowTaskUserById(
    id: number,
    transaction?: Transaction
  ): Promise<WorkflowTask> {
    return this.workflowTask.findByPk(id, {
      transaction,
      attributes: ['id'],
      include: [
        {
          model: User,
          required: true,
          as: 'user',
          association: 'user',
          attributes: ['substituteUserStartDate', 'substituteUserEndDate']
        }
      ]
    })
  }

  /**
   * Busca uma resposta de uma tarefa por id
   * @param workflowTaskResponseId number
   */
  findWorkflowTaskResponseById(id: number): Promise<WorkflowTaskResponse> {
    return this.workflowTaskResponse.findByPk(id, {
      attributes: [
        'requiresJustification',
        'finishWorkflowSuccessfully',
        'finishWorkflowWithError'
      ]
    })
  }

  /**
   * Busca os SLAs do usuário
   * @param query SlaQuery
   * @param userId number
   * @returns Promise<PagedResult<SlaDto>>
   */
  async getSLAs(query: SlaQuery, userId: number): Promise<PagedResult<SlaDto>> {
    const { totalRegisters } = await this.db.query(
      'SELECT COUNT(*) as totalRegisters FROM vw_user_available_workflow_tasks ' +
        `${ this.getSlaWhereClause(query) }`,
      {
        bind: [userId],
        type: QueryTypes.SELECT,
        plain: true
      }
    )

    const orderBy = this.getOrderByColumn(query.orderBy)
    const orderBySort = query.sort ?? 'ASC'
    const offset = Number(query.page - 1) * Number(query.pageSize)
    const limit = Number(query.pageSize)

    const response = await this.db.query<UserAvailableWorkflowTaskViewDto>(
      'SELECT * ' +
        'FROM vw_user_available_workflow_tasks ' +
        `${ this.getSlaWhereClause(query) }` +
        `ORDER BY ${ orderBy } ${ orderBySort } ` +
        'OFFSET $2 ROWS ' +
        'FETCH NEXT $3 ROWS ONLY ',
      {
        bind: [userId, offset, limit],
        type: QueryTypes.SELECT
      }
    )

    const slas: SlaDto[] = response.map((res) => ({
      dueDate: res.dueDate,
      expirationTime: this.getSlaExpirationIndicator(res.percentage),
      parentCompanyName: 'MOCK',
      taskName: res.taskName,
      workflowType: res.workflowType,
      workflowIdentifier: res.workflowIdentifier,
      workflowTypeAlias: res.workflowTypeAlias
    }))

    return Promise.resolve(new PagedResult<SlaDto>(totalRegisters, slas))
  }

  /**
   * Calcula o indicador de tempo de um SLA
   * @param percentage number
   * @returns SlaExpirationColorEnum
   */
  getSlaExpirationIndicator(percentage: number): SlaExpirationIndicatorEnum {
    if (percentage < 80) return SlaExpirationIndicatorEnum.GREEN

    return percentage < 100
      ? SlaExpirationIndicatorEnum.YELLOW
      : SlaExpirationIndicatorEnum.RED
  }

  /**
   * Retorna a coluna a ser ordenada na consulta de SLAs
   * @param orderBy SlaOrderByOptionsEnum
   */
  getOrderByColumn(orderBy: SlaOrderByOptionsEnum): string {
    if (!orderBy) return 'userId'

    return orderBy === SlaOrderByOptionsEnum.EXPIRATION_TIME
      ? 'percentage'
      : orderBy
  }

  /**
   * Monta a clausula where de consulta de SLAs
   * @param query SlaQuery
   * @returns string
   */
  getSlaWhereClause(query: SlaQuery): string {
    const where = 'WHERE userId = $1 '
    if (!query.expirationIndicator) return where

    if (query.expirationIndicator === SlaExpirationIndicatorEnum.RED)
      return `${ where } AND percentage = 100 `
    if (query.expirationIndicator === SlaExpirationIndicatorEnum.YELLOW)
      return `${ where } AND percentage < 100 AND percentage >= 80 `
    return `${ where } AND percentage < 80 `
  }

  /**
   * Busca o resumo da quantidade de SLAs por indicadores
   * @param userId number
   * @returns Promise<SlaPreviewDto>
   */
  async findSLAPreview(userId: number): Promise<SlaPreviewDto> {
    const slaPercentages =
      await this.db.query<UserAvailableWorkflowTaskViewDto>(
        'SELECT percentage ' +
          'FROM vw_user_available_workflow_tasks ' +
          'WHERE userId = $1 ',
        {
          bind: [userId],
          type: QueryTypes.SELECT
        }
      )

    return {
      green: slaPercentages.filter(
        (sla) =>
          this.getSlaExpirationIndicator(sla.percentage) ===
          SlaExpirationIndicatorEnum.GREEN
      ).length,
      yellow: slaPercentages.filter(
        (sla) =>
          this.getSlaExpirationIndicator(sla.percentage) ===
          SlaExpirationIndicatorEnum.YELLOW
      ).length,
      red: slaPercentages.filter(
        (sla) =>
          this.getSlaExpirationIndicator(sla.percentage) ===
          SlaExpirationIndicatorEnum.RED
      ).length
    }
  }

  /**
   * Busca a lista de workflows disponíveis para desativar
   */
  async findExpiredWorkflowIdsToDeactivate(
    transaction: Transaction
  ): Promise<number[]> {
    const response = await this.db.query<{ id: number }>(
      'SELECT * FROM vw_expired_workflows_able_to_deactive',
      { transaction, type: QueryTypes.SELECT }
    )

    return response.map(({ id }) => id)
  }

  /**
   * Desativa os workflows informados
   * @param id number
   * @param transaction Transaction
   */
  async deactivateMultiple(
    id: number[],
    transaction: Transaction
  ): Promise<void> {
    try {
      await this.workflowModel.update(
        { active: false },
        {
          where: { id },
          transaction
        }
      )
    } catch (error) {
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        `Ocorreu um arro ao inativar os fluxos de trabalho: ${ id.join(', ') }`
      )
    }
  }
}
