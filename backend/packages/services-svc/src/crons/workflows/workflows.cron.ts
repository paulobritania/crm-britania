import { Injectable, Logger, Inject } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { Sequelize } from 'sequelize-typescript'

import { WorkflowsService } from '../../modules/workflows/workflows.service'

@Injectable()
export class WorkflowsCron {
  private readonly _logger: Logger

  constructor(
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(WorkflowsService)
    private readonly workflowsService: WorkflowsService
  ) {
    this._logger = new Logger(WorkflowsCron.name)
  }

  /**
   * Rotina de inativação dos fluxos de trabalho expirados e com
   * outro fluxo do mesmo tipo em vigência
   */
  @Cron('1 0 * * *', {
    name: 'DeactivateExpiredWorkflows',
    timeZone: 'America/Sao_Paulo'
  })
  async deactivateExpiredWorkflows(): Promise<void> {
    this._logger.debug('Executando rotina de inativação dos fluxos de trabalho')

    const transaction = await this.db.transaction()
    try {
      const expiredWorkflowIds =
        await this.workflowsService.findExpiredWorkflowIdsToDeactivate(
          transaction
        )

      if (!expiredWorkflowIds.length) {
        this._logger.debug('Não há fluxos de trabalho para serem finalizados')
        await transaction.rollback()
        return
      }

      await this.workflowsService.deactivateMultiple(
        expiredWorkflowIds,
        transaction
      )

      await transaction.commit()
      this._logger.debug(
        `Rotina de inativação finalizada. ${ expiredWorkflowIds.length } fluxos de trabalho inativados`
      )
    } catch (error) {
      await transaction.rollback()

      this._logger.error(
        'Ocorreu um erro ao inativar os fluxos de trabalho',
        error
      )
    }
  }
}
