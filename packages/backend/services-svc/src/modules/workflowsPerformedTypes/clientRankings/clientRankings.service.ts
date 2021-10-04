import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { ChangeClientRankingDto } from '../../clientRankings/dto/changeRequest/changeClientRanking.dto'
import { ClientRankingIndicator } from '../../clientRankings/entities/clientRankingIndicator.entity'
import { Ranking } from '../../clientRankings/entities/ranking.entity'
import { User } from '../../users/entities/user.entity'
import { WorkflowTypeEnum } from '../../workflows/enum/workflowType.enum'
import { WorkflowPerformedHistoryDto } from '../../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { WorkflowPerformed } from '../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedService } from '../../workflowsPerformed/workflowPerformed.service'
import { AdvanceClientRankingWorkflowResultDto } from './dtos/advanceClientRankingWorkflowResult.dto'
import { WorkflowClientRanking } from './entities/workflowClientRanking.entity'

@Injectable()
export class WorkflowClientRankingService {
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(WorkflowClientRanking)
    private workflowClientRankingModel: typeof WorkflowClientRanking,
    @Inject(WorkflowPerformedService)
    private readonly workflowPerformedService: WorkflowPerformedService
  ) {}

  async startWorkflow(
    clientTotvsCode: number,
    userId: number,
    clientRankingIndicator: ClientRankingIndicator,
    data: ChangeClientRankingDto
  ): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const workflowInProgress = await this.findWorkflowInProgress(
        clientTotvsCode
      )

      if (workflowInProgress)
        throw new BadRequestException(
          'O cliente já possui um fluxo de trabalho de alteração de ranking de cliente em execução'
        )

      const workflowPerformedId =
        await this.workflowPerformedService.startWorkflow(
          WorkflowTypeEnum.ARC,
          userId,
          transaction,
          clientTotvsCode
        )

      const payload = {
        clientTotvsCode,
        rankingId: data.rankingId,
        justification: data.justification,
        workflowPerformedId,
        clientRankingIndicatorId: clientRankingIndicator?.id
      }

      await this.workflowClientRankingModel.create(payload, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao iniciar o fluxo de trabalho de alteração de ranking de cliente'
      )
    }
  }

  /**
   * Busca o ranking atual e o anterior de um cliente
   * @param clientTotvsCode number
   */
  findWorkflowInProgress(
    clientTotvsCode: number
  ): Promise<WorkflowClientRanking> {
    return this.workflowClientRankingModel.findOne({
      attributes: [
        'justification',
        'workflowPerformedId',
        'id',
        'clientTotvsCode'
      ],
      where: {
        clientTotvsCode
      },
      include: [
        { model: Ranking, required: true },
        {
          model: WorkflowPerformed,
          where: { concluded: false },
          attributes: ['createdAt', 'id', 'createdBy'],
          required: true,
          include: [
            {
              model: User,
              attributes: ['username'],
              required: true
            }
          ]
        }
      ]
    })
  }

  /**
   * Busca os workflows executados e em execução de um cliente
   * @param clientTotvsCode number
   */
  async findWorkflowsHistory(
    clientTotvsCode: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    const workflowsPerformedHistoryQuery =
      this.workflowPerformedService.findWorkflowsHistoryQuery()

    const workflowClientRankings =
      await this.workflowClientRankingModel.findAll({
        ...workflowsPerformedHistoryQuery,
        where: {
          clientTotvsCode
        }
      })

    return workflowClientRankings.map((ranking) =>
      this.workflowPerformedService.formatWorkflowToHistory(
        ranking.workflowPerformed
      )
    )
  }

  /**
   * Busca o histórico de execução de um workflow de ranking de cliente
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

    const workflowClientRankings =
      await this.workflowClientRankingModel.findOne({
        ...workflowsPerformedHistoryQuery,
        where: {
          clientTotvsCode
        }
      })

    if (!workflowClientRankings)
      throw new BadRequestException(
        'Histórico do fluxo de trabalho não encontrado'
      )

    return this.workflowPerformedService.formatWorkflowToPerformedHistory(
      workflowClientRankings.workflowPerformed
    )
  }

  /**
   * Avança uma etapa no workflow de ranking de cliente e retorna se o workflow foi finalizado
   * @param clientTotvsCode number
   * @param userId number
   * @param data WorkflowPerformedResponseDto
   */
  async advanceWorkflow(
    clientTotvsCode: number,
    userId: number,
    data: WorkflowPerformedResponseDto,
    transaction: Transaction
  ): Promise<AdvanceClientRankingWorkflowResultDto> {
    const workflowInProgress = await this.findWorkflowInProgress(
      clientTotvsCode
    )

    if (!workflowInProgress)
      throw new BadRequestException(
        'Não existe um fluxo de trabalho de alteração de ranking de cliente em execução'
      )

    const advanceWorkflowResult =
      await this.workflowPerformedService.advanceWorkflow(
        workflowInProgress.workflowPerformed.id,
        userId,
        data,
        transaction
      )

    return {
      ...advanceWorkflowResult,
      workflow: workflowInProgress
    }
  }

  /**
   * Busca os código de clientes baseado nos ids de execução dos workflows
   * @param workflowPerformedIds number[]
   * @returns Promise<number[]>
   */
  async getClientCodesByPerformedIds(
    workflowPerformedIds: number[]
  ): Promise<number[]> {
    const workflows = await this.workflowClientRankingModel.findAll({
      attributes: ['clientTotvsCode'],
      where: { workflowPerformedId: workflowPerformedIds },
      raw: true
    })

    return workflows.map((workflow) => workflow.clientTotvsCode)
  }
}
