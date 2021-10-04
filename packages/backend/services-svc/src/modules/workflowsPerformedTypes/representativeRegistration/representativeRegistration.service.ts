/* eslint-disable prefer-const */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BadRequestException,
  HttpException,
  HttpService,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { Model, Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { isEmpty } from 'lodash'

import { Address } from '../../address/entities/address.entity'
import { FilesService } from '../../files/files.service'
import { ConcludeRepresentativePreRegistrationDto } from '../../representatives/dtos/preRegistration/concludeRepresentativePreRegistration.dto'
import {
  RepresentativeDocumentDto,
  RepresentativeCommissionPercentageDto,
  SaveRepresentativePreRegistrationDto
} from '../../representatives/dtos/preRegistration/saveRepresentativePreRegistration.dto'
import { UpdateRepresentativePreRegistrationDto } from '../../representatives/dtos/preRegistration/updateRepresentativePreRegistration.dto'
import { WorkflowTypeEnum } from '../../workflows/enum/workflowType.enum'
import { WorkflowPerformedHistoryDto } from '../../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { WorkflowPerformed } from '../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedService } from '../../workflowsPerformed/workflowPerformed.service'
import { IntegrationResponse } from './dtos/integration/integrationResponse.dto'
import { RepresentativeIntegrationPayloadDto } from './dtos/integration/representativeIntegrationPayload.dto'
import { RepresentativeBankData } from './entities/representativeBankData.entity'
import { RepresentativeCommissionPercentage } from './entities/representativeCommissionPercentage.entity'
import { RepresentativeDocument } from './entities/representativeDocument.entity'
import { RepresentativeFinancial } from './entities/representativeFinancial.entity'
import { RepresentativeMaintenance } from './entities/representativeMaintenance.entity'
import { WorkflowRepresentativeRegistrationPerformed } from './entities/worfklowRepresentativeRegistrationPerformed.entity'
import { WorkflowRepresentativeRegistration } from './entities/workflowRepresentativeRegistration.entity'

const moment = require('moment')

class Entity extends Model {
  id: number
}

@Injectable()
export class RepresentativeRegistrationService {
  private readonly integrationsUrl: string

  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(FilesService) private readonly filesService: FilesService,
    @Inject(HttpService) private readonly httpService: HttpService,
    @Inject(WorkflowPerformedService)
    private workflowPerformedService: WorkflowPerformedService,
    @InjectModel(WorkflowRepresentativeRegistration)
    private workflowRepresentativeRegistrationModel: typeof WorkflowRepresentativeRegistration,
    @InjectModel(RepresentativeBankData)
    private representativeBankDataModel: typeof RepresentativeBankData,
    @InjectModel(RepresentativeFinancial)
    private representativeFinancialModel: typeof RepresentativeFinancial,
    @InjectModel(Address)
    private addressModel: typeof Address,
    @InjectModel(RepresentativeMaintenance)
    private representativeMaintenanceModel: typeof RepresentativeMaintenance,
    @InjectModel(RepresentativeCommissionPercentage)
    private representativeCommissionPercentageModel: typeof RepresentativeCommissionPercentage,
    @InjectModel(RepresentativeDocument)
    private representativeDocumentModel: typeof RepresentativeDocument,
    @InjectModel(WorkflowRepresentativeRegistrationPerformed)
    private workflowRepresentativeRegistrationPerformedModel: typeof WorkflowRepresentativeRegistrationPerformed,
    @InjectModel(WorkflowPerformed)
    private workflowPerformedModel: typeof WorkflowPerformed
  ) {
    this.integrationsUrl = process.env.BRITANIA_INTEGRACOES_TOTVS_URL
  }

  async getRepresentativeRelations(
    id: number
  ): Promise<WorkflowRepresentativeRegistration> {
    return this.workflowRepresentativeRegistrationModel.findByPk(id, {
      attributes: [
        'addressId',
        'representativeBankDataId',
        'representativeFinancialId',
        'representativeMaintenanceId',
        'workflowPerformedId'
      ]
    })
  }

  /**
   * Salva parcialmente um Pré-Cadastro de Representante
   * @param userId number
   * @param data SaveRepresentativePreRegistrationDto
   * @param workflowPerformedId number || null
   * @param trx Transaction
   */
  async save(
    userId: number,
    data: SaveRepresentativePreRegistrationDto,
    workflowPerformedId: number = null,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())

    try {
      let {
        address,
        financial,
        maintenance,
        bankData,
        documents,
        commissionPercentage,
        ...createData
      } = data

      const isNewData = !createData.id

      if (!isNewData) {
        const workflowInProgress = await this.findWorkflowInProgress(
          createData.id,
          transaction
        )

        if (workflowInProgress)
          throw new BadRequestException(
            'O representante já possui um fluxo de trabalho de pré-cadastro em execução'
          )

        const representative = await this.getRepresentativeRelations(
          createData.id
        )
        address = { ...address, id: representative.addressId }
        financial = {
          ...financial,
          id: representative.representativeFinancialId
        }
        maintenance = {
          ...maintenance,
          id: representative.representativeMaintenanceId
        }
        bankData = { ...bankData, id: representative.representativeBankDataId }
      }

      const representativeBankDataId = bankData
        ? await this.upsert(
            bankData,
            this.representativeBankDataModel,
            transaction
          )
        : null

      const representativeFinancialId = await this.upsert(
        financial,
        this.representativeFinancialModel,
        transaction
      )

      const representativeMaintenanceId = await this.upsert(
        maintenance,
        this.representativeMaintenanceModel,
        transaction
      )

      const addressId = await this.upsert(
        address,
        this.addressModel,
        transaction
      )

      const workflowRepresentativeRegistrationData = {
        ...createData,
        addressId,
        representativeBankDataId,
        representativeFinancialId,
        representativeMaintenanceId,
        workflowPerformedId,
        createdAt: createData.id ? undefined : moment().utc(),
        updatedAt: moment().utc(),
        createdBy: createData.id ? undefined : userId,
        updatedBy: userId
      }

      const workflowRepresentativeRegistrationId = await this.upsert(
        workflowRepresentativeRegistrationData,
        this.workflowRepresentativeRegistrationModel,
        transaction
      )

      if (!isEmpty(commissionPercentage)) {
        await this.saveCommissionPercentages(
          commissionPercentage,
          isNewData,
          workflowRepresentativeRegistrationId,
          transaction
        )
      }

      if (!isEmpty(documents)) {
        await this.saveDocuments(
          documents,
          isNewData,
          userId,
          workflowRepresentativeRegistrationId,
          transaction
        )
      }

      if (!trx) await transaction.commit()
      return workflowRepresentativeRegistrationId
    } catch (error) {
      if (!trx) await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao salvar o pré-cadastro de representante'
      )
    }
  }

  /**
   * Atualiza (insere, edita e remove registros repetidos) a tabela de representativeDocument
   * @param documents RepresentativeDocumentDto[]
   * @param isNewRegister boolean
   * @param userId number
   * @param workflowRepresentativeRegistrationId number
   * @param transaction Transaction
   */
  async saveDocuments(
    documents: RepresentativeDocumentDto[],
    isNewRegister: boolean,
    userId: number,
    workflowRepresentativeRegistrationId: number,
    transaction: Transaction
  ): Promise<void> {
    const representativeDocumentsData = documents.map((document) => ({
      ...document,
      workflowRepresentativeRegistrationId
    }))

    if (isNewRegister) {
      await this.representativeDocumentModel.bulkCreate(
        representativeDocumentsData,
        { transaction }
      )
    } else {
      const existentDocuments = await this.representativeDocumentModel.findAll({
        where: { workflowRepresentativeRegistrationId },
        transaction,
        raw: true
      })

      const ids = documents
        .filter((document) => document.id)
        .map((document) => document.id)

      const documentsToDelete = existentDocuments.filter(
        (document) => !ids.includes(document.id)
      )
      const documentsToCreate = representativeDocumentsData.filter(
        (document) => !document.id
      )
      const documentsToUpdate = documents.filter((document) =>
        ids.includes(document.id)
      )

      await Promise.all(
        documentsToDelete.map(async (document) => {
          await this.representativeDocumentModel.destroy({
            where: { id: document.id },
            transaction
          })
          await this.filesService.delete(document.fileId, userId, transaction)
        })
      )

      await Promise.all(
        documentsToUpdate.map(async (document) => {
          await this.representativeDocumentModel.update(document, {
            where: { id: document.id },
            transaction
          })
        })
      )

      await this.representativeDocumentModel.bulkCreate(documentsToCreate, {
        transaction
      })
    }
  }

  /**
   * Atualiza (insere, edita e remove registros repetidos) a tabela de representativeCommissionPercentage
   * @param commissionPercentages RepresentativeCommissionPercentageDto[]
   * @param isNewRegister boolean
   * @param workflowRepresentativeRegistrationId number
   * @param transaction Transaction
   */
  async saveCommissionPercentages(
    commissionPercentages: RepresentativeCommissionPercentageDto[],
    isNewRegister: boolean,
    workflowRepresentativeRegistrationId: number,
    transaction: Transaction
  ): Promise<void> {
    const commissionPercentagesData = commissionPercentages.map(
      (commissionPercentage) => ({
        ...commissionPercentage,
        workflowRepresentativeRegistrationId
      })
    )

    if (isNewRegister) {
      await this.representativeCommissionPercentageModel.bulkCreate(
        commissionPercentagesData,
        { transaction }
      )
    } else {
      const existentCommissionPercentages =
        await this.representativeCommissionPercentageModel.findAll({
          where: { workflowRepresentativeRegistrationId },
          transaction,
          attributes: ['id'],
          raw: true
        })

      const ids = commissionPercentages
        .filter((commissionPercentage) => commissionPercentage.id)
        .map((commissionPercentage) => commissionPercentage.id)

      const commissionsToDelete = existentCommissionPercentages.filter(
        (commission) => !ids.includes(commission.id)
      )
      const commissionsToCreate = commissionPercentagesData.filter(
        (commission) => !commission.id
      )

      const commissionsToUpdate = commissionPercentages.filter((commission) =>
        ids.includes(commission.id)
      )

      await Promise.all(
        commissionsToDelete.map(async (commission) => {
          await this.representativeCommissionPercentageModel.destroy({
            where: { id: commission.id },
            transaction
          })
        })
      )

      await Promise.all(
        commissionsToUpdate.map(async (commission) => {
          await this.representativeCommissionPercentageModel.update(
            commission,
            {
              where: { id: commission.id },
              transaction
            }
          )
        })
      )

      await this.representativeCommissionPercentageModel.bulkCreate(
        commissionsToCreate,
        {
          transaction
        }
      )
    }
  }

  async update(
    id: number,
    userId: number,
    data: UpdateRepresentativePreRegistrationDto
  ): Promise<void> {
    const representative =
      await this.workflowRepresentativeRegistrationModel.findByPk(id, {
        include: [
          {
            model: this.workflowPerformedModel,
            attributes: ['id', 'concluded']
          }
        ]
      })
    if (!representative) {
      throw new BadRequestException(
        'Pré-cadastro de representante não encontrado'
      )
    }

    if (!representative.workflowPerformed.concluded)
      throw new BadRequestException(
        'O representante já possui um fluxo de trabalho de pré-cadastro em execução'
      )

    await this.startWorkflow(userId, data)
  }

  /**
   * Inicia o processo de atualização de Pré-Cadastro de Representante
   * @param userId number
   * @param data ConcludeRepresentativePreRegistrationDto
   */
  async startWorkflow(
    userId: number,
    data: ConcludeRepresentativePreRegistrationDto
  ): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const workflowPerformedId =
        await this.workflowPerformedService.startWorkflow(
          WorkflowTypeEnum.PCR,
          userId,
          transaction
        )

      const representativeRegistrationId = await this.save(
        userId,
        data,
        workflowPerformedId,
        transaction
      )

      await this.workflowRepresentativeRegistrationPerformedModel.create(
        {
          representativeRegistrationId,
          performedId: workflowPerformedId
        },
        { transaction }
      )

      await this.workflowPerformedService.updateIdentifier(
        workflowPerformedId,
        representativeRegistrationId,
        transaction
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao iniciar o fluxo de trabalho de pré-cadastro de representante'
      )
    }
  }

  /**
   * Busca se existe um workflow em andamento
   * @param userId number
   * @param transaction Transaction
   * @returns WorkflowRepresentativeRegistration
   */
  async findWorkflowInProgress(
    id: number,
    transaction?: Transaction
  ): Promise<WorkflowRepresentativeRegistration> {
    return this.workflowRepresentativeRegistrationModel.findByPk(id, {
      attributes: ['id'],
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
   * Insere um novo registro ou o atualiza caso ele já exista
   * @param data any
   * @param model MyModel
   * @param transaction Transaction
   * @returns number
   */
  async upsert(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    data: any,
    model: typeof Entity,
    transaction: Transaction
  ): Promise<number> {
    if (data.id) {
      const [, [{ id }]] = await model.update(data, {
        where: { id: data.id },
        transaction,
        returning: true
      })

      return id
    }
    const { id } = await model.create(data, { transaction })
    return id
  }

  async integrate(
    workflowRepresentativeId: number,
    transaction: Transaction
  ): Promise<string> {
    try {
      const workflow =
        await this.workflowRepresentativeRegistrationModel.findByPk(
          workflowRepresentativeId,
          {
            include: [
              {
                model: this.representativeFinancialModel
              },
              {
                model: this.representativeMaintenanceModel
              },
              {
                model: this.addressModel
              },
              {
                model: this.workflowPerformedModel
              },
              {
                model: this.representativeMaintenanceModel
              }
            ],
            transaction
          }
        )

      const payload: RepresentativeIntegrationPayloadDto = {
        representante: {
          cod_tip_repres: workflow.maintenance.representativeType.toString(),
          v_ind_pessoa: workflow.maintenance.personType,
          nom_pessoa: workflow.companyName,
          cod_pais: workflow.address.country,
          cod_id_feder: workflow.address.state,
          nom_abrev: workflow.financial.shortName,
          cod_grp_repres:
            workflow.maintenance.representativeGroupCode.toString(),
          dat_impl_repres: workflow.workflowPerformed.createdAt,
          val_perc_comis_repres: workflow.maintenance.commissionPercentage,
          val_perc_comis_repres_emis:
            workflow.maintenance.commissionEmissionPercentage,
          val_perc_comis_min: workflow.maintenance.minimumCommissionPercentage,
          val_perc_comis_max: workflow.maintenance.maximumCommissionPercentage,
          cod_unid_negoc: workflow.maintenance.manualCommission.toString(),
          cod_calend_comis: workflow.maintenance.paymentCalendar,
          'cod-formula': workflow.maintenance.formula
        }
      }

      const { data } = await this.httpService
        .post<IntegrationResponse>(
          `${ this.integrationsUrl }/representante`,
          payload
        )
        .toPromise()

      if (data.status === 'Erro')
        throw new InternalServerErrorException(
          'Ocorreu um erro no serviço de integração de pré-cadastro de representante'
        )

      return data['cod-rep']
    } catch (error) {
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao realizar a integração de pré-cadastro de representante	'
      )
    }
  }

  /**
    Avança uma etapa no workflow de representante
    @param workflowRepresentativeId: number
    @param data: WorkflowPerformedResponseDto
    @param userId: number
    @param transaction: Transaction
  */
  async advanceRepresentativeWorkflow(
    workflowRepresentativeId: number,
    data: WorkflowPerformedResponseDto,
    userId: number,
    transaction: Transaction
  ): Promise<void> {
    const workflowInProgress = await this.findWorkflowInProgress(
      workflowRepresentativeId,
      transaction
    )
    if (!workflowInProgress)
      throw new BadRequestException(
        'Não há um fluxo de trabalho de pré-cadastro em andamento para este representante'
      )

    const { finished, finishedWithSuccess } =
      await this.workflowPerformedService.advanceWorkflow(
        workflowInProgress.workflowPerformed.id,
        userId,
        data,
        transaction
      )

    if (finished && finishedWithSuccess)
      await this.integrate(workflowRepresentativeId, transaction)
  }

  /**
   * Busca o histórico de workflows do representante
   * @param representativeId number
   * */
  async findWorkflowsHistory(
    representativeId: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    const workflowsPerformedHistoryQuery =
      this.workflowPerformedService.findWorkflowsHistoryQuery()
    const workflowRepresentatives =
      await this.workflowRepresentativeRegistrationModel.findByPk(
        representativeId,
        {
          include: [
            {
              model: this.workflowRepresentativeRegistrationPerformedModel,
              ...workflowsPerformedHistoryQuery
            }
          ],
          attributes: ['id']
        }
      )
    return workflowRepresentatives.representativePerformeds.map(
      (representative) =>
        this.workflowPerformedService.formatWorkflowToHistory(
          representative.workflowPerformed
        )
    )
  }

  /**
   * Busca o histórico de tarefas da execução de um workflow de representante
   * @param representativeId number
   * @param workflowPerformedId number
   * */
  async findWorkflowPerformedHistory(
    representativeId: number,
    workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    const workflowsPerformedHistoryQuery =
      this.workflowPerformedService.findWorkflowsPerformedHistoryQuery(
        workflowPerformedId
      )
    const workflowRepresentative =
      await this.workflowRepresentativeRegistrationModel.findByPk(
        representativeId,
        {
          include: [
            {
              model: this.workflowRepresentativeRegistrationPerformedModel,
              ...workflowsPerformedHistoryQuery
            }
          ],
          attributes: ['id']
        }
      )
    if (!workflowRepresentative)
      throw new BadRequestException(
        'Histórico do fluxo de trabalho não encontrado'
      )

    return this.workflowPerformedService.formatWorkflowToPerformedHistory(
      workflowRepresentative.representativePerformeds[0].workflowPerformed
    )
  }
}
