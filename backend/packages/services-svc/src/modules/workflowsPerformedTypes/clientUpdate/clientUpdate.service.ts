import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotImplementedException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { UpdateClientDto } from '../../clients/dto/update/updateClient.dto'
import { WorkflowTypeEnum } from '../../workflows/enum/workflowType.enum'
import { WorkflowPerformedHistoryDto } from '../../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { WorkflowPerformed } from '../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedService } from '../../workflowsPerformed/workflowPerformed.service'
import { WorkflowClientUpdate } from './entities/workflowClientUpdate.entity'
import { WorkflowClientUpdateAddress } from './entities/workflowClientUpdateAddress.entity'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment')

@Injectable()
export class WorkflowClientUpdateService {
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(WorkflowPerformedService)
    private workflowPerformedService: WorkflowPerformedService,
    @InjectModel(WorkflowClientUpdate)
    private workflowClientUpdateModel: typeof WorkflowClientUpdate,
    @InjectModel(WorkflowClientUpdateAddress)
    private workflowClientUpdateAddressModel: typeof WorkflowClientUpdateAddress
  ) {}

  async startWorkflow(
    clientTotvsCode: number,
    userId: number,
    data: UpdateClientDto
  ): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const workflowInProgress = await this.findWorkflowInProgress(
        clientTotvsCode
      )

      if (workflowInProgress)
        throw new BadRequestException(
          'O cliente j?? possui um fluxo de trabalho de atualiza????o cadastral em andamento'
        )

      const workflowPerformedId =
        await this.workflowPerformedService.startWorkflow(
          WorkflowTypeEnum.ACdC,
          userId,
          transaction,
          clientTotvsCode
        )

      const { deliveryAddress, billingAddress, ...createData } = data

      const { id: deliveryAddressId } =
        await this.workflowClientUpdateAddressModel.create(deliveryAddress, {
          transaction
        })

      const { id: billingAddressId } =
        await this.workflowClientUpdateAddressModel.create(billingAddress, {
          transaction
        })

      const payload = {
        ...createData,
        deliveryAddressId,
        billingAddressId,
        clientTotvsCode,
        workflowPerformedId,
        createdBy: userId,
        createdAt: moment().utc()
      }

      await this.workflowClientUpdateModel.create(payload, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao iniciar o fluxo de altera????o cadastral do cliente'
      )
    }
  }

  findWorkflowInProgress(
    clientTotvsCode: number,
    transaction?: Transaction
  ): Promise<WorkflowClientUpdate> {
    return this.workflowClientUpdateModel.findOne({
      attributes: ['id', 'workflowPerformedId'],
      where: {
        clientTotvsCode
      },
      include: [
        {
          model: WorkflowPerformed,
          attributes: ['id'],
          where: {
            concluded: false
          }
        }
      ],
      transaction
    })
  }

  /**
   * Busca os workflows executados e em execu????o de um cliente
   * @param clientTotvsCode number
   */
  async findWorkflowsHistory(
    clientTotvsCode: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    const workflowsPerformedHistoryQuery =
      this.workflowPerformedService.findWorkflowsHistoryQuery()

    const workflowClientRankings = await this.workflowClientUpdateModel.findAll(
      {
        ...workflowsPerformedHistoryQuery,
        where: {
          clientTotvsCode
        }
      }
    )

    return workflowClientRankings.map((ranking) =>
      this.workflowPerformedService.formatWorkflowToHistory(
        ranking.workflowPerformed
      )
    )
  }

  /**
   * Busca o hist??rico de execu????o de um workflow de update de cliente
   * @param clientTotvsCode number
   * @param workflowPerformedId number
   */
  async findWorkflowPerformedHistory(
    clientTotvsCode: number,
    workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    const workflowsPerformedHistoryQuery =
      this.workflowPerformedService.findWorkflowsPerformedHistoryQuery(
        workflowPerformedId
      )

    const workflowClientRankings = await this.workflowClientUpdateModel.findOne(
      {
        ...workflowsPerformedHistoryQuery,
        where: {
          clientTotvsCode
        }
      }
    )

    if (!workflowClientRankings)
      throw new BadRequestException(
        'O hist??rico do fluxo de trabalho n??o foi encontrado'
      )

    return this.workflowPerformedService.formatWorkflowToPerformedHistory(
      workflowClientRankings.workflowPerformed
    )
  }

  /**
   * Avan??a uma etapa no workflow de update de cliente e retorna se o workflow foi finalizado
   * @param clientTotvsCode number
   * @param userId number
   * @param data WorkflowPerformedResponseDto
   */
  async advanceWorkflow(
    clientTotvsCode: number,
    userId: number,
    data: WorkflowPerformedResponseDto,
    transaction: Transaction
  ): Promise<void> {
    const workflowInProgress = await this.findWorkflowInProgress(
      clientTotvsCode
    )

    if (!workflowInProgress)
      throw new BadRequestException(
        'N??o existe um fluxo de trabalho de altera????o de cadastro de cliente em andamento'
      )

    const { finished, finishedWithSuccess } =
      await this.workflowPerformedService.advanceWorkflow(
        workflowInProgress.workflowPerformed.id,
        userId,
        data,
        transaction
      )

    if (finished && finishedWithSuccess)
      await this.integrate(/* clientTotvsCode, workflowInProgress */)
  }

  integrate(): // clientTotvsCode: number,
  // workflowInProgress: WorkflowClientUpdate
  Promise<void> {
    throw new NotImplementedException('Integra????o n??o implementada')
  }

  /**
   * Busca os c??digo de clientes baseado nos ids de execu????o dos workflows
   * @param workflowPerformedIds number[]
   * @returns Promise<number[]>
   */
  async getClientCodesByPerformedIds(
    workflowPerformedIds: number[]
  ): Promise<number[]> {
    const workflows = await this.workflowClientUpdateModel.findAll({
      attributes: ['clientTotvsCode'],
      where: { workflowPerformedId: workflowPerformedIds },
      raw: true
    })

    return workflows.map((workflow) => workflow.clientTotvsCode)
  }

  /**
   * Busca os registros de atualiza????o de clientes por c??digos
   * @param clientCodes number[]
   */
  findClientUpdatesByCodes(
    clientCodes: number[]
  ): Promise<WorkflowClientUpdate[]> {
    return this.workflowClientUpdateModel.findAll({
      attributes: ['id', 'clientTotvsCode'],
      where: { clientTotvsCode: clientCodes },
      include: [
        {
          model: WorkflowPerformed,
          attributes: ['concluded']
        }
      ]
    })
  }

  /**
   * Busca os detalhes de um workflow por id
   * @param id number
   * @returns Promise<WorkflowClientUpdate>
   */
  getById(id: number): Promise<WorkflowClientUpdate> {
    return this.workflowClientUpdateModel.findByPk(id, {
      include: [
        { model: WorkflowClientUpdateAddress, as: 'deliveryAddress' },
        { model: WorkflowClientUpdateAddress, as: 'billingAddress' }
      ]
    })
  }
}
