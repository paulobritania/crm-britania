/* eslint-disable @typescript-eslint/ban-types */
import {
  Injectable,
  Inject,
  InternalServerErrorException,
  BadRequestException,
  HttpException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Transaction, Sequelize, Model } from 'sequelize'

import { convertToFindOptions } from '../../../utils/pagination/pagedQuery.dto'
import { PagedResult } from '../../../utils/pagination/pagedResult.dto'
import { ClientQueryDto } from '../../clients/dto/findAll/clientQuery.dto'
import { ParentCompanyDto } from '../../clients/dto/findAll/listClient.dto'
import { ClientOrderByEnum } from '../../clients/enum/clientOrderBy.enum'
import { ClientRegistrationStatusEnum } from '../../clients/enum/clientRegistrationStatus.enum'
import { ClientRegistrationTypeEnum } from '../../clients/enum/clientRegistrationType.enum'
import { ClientStatusEnum } from '../../clients/enum/clientStatus.enum'
import { File } from '../../files/entities/file.entity'
import { FilesService } from '../../files/files.service'
import { Workflow } from '../../workflows/entities/workflow.entity'
import { WorkflowTask } from '../../workflows/entities/workflowTask.entity'
import { WorkflowTaskResponse } from '../../workflows/entities/workflowTaskResponse.entity'
import { WorkflowTypeEnum } from '../../workflows/enum/workflowType.enum'
import { WorkflowPerformedHistoryDto } from '../../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { WorkflowPerformed } from '../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedService } from '../../workflowsPerformed/workflowPerformed.service'
import { CreateClientAdditionalInformationBankReferenceDto } from './dto/create/createClientAdditionalInformationBankReference.dto'
import { CreateClientAdditionalInformationCommercialReferenceDto } from './dto/create/createClientAdditionalInformationCommercialReference.entity.dto'
import { CreateClientAdditionalInformationParticipationCompanyDto } from './dto/create/createClientAdditionalInformationParticipationCompany.dto'
import { CreateClientAdditionalInformationRevenueDto } from './dto/create/createClientAdditionalInformationRevenue.dto'
import { CreateClientDocumentDto } from './dto/create/createClientDocument.dto'
import { CreateClientRegisterDto } from './dto/create/createClientRegister.dto'
import { FindDetailsClientRegisterDto } from './dto/find/findDetailsClientRegister.dto'
import { ClientAdditionalInformation } from './entitites/clientAdditionalInformation.entity'
import { ClientAdditionalInformationBankReference } from './entitites/clientAdditionalInformationBankReference.entity'
import { ClientAdditionalInformationCommercialReference } from './entitites/clientAdditionalInformationCommercialReference.entity'
import { ClientAdditionalInformationCounter } from './entitites/clientAdditionalInformationCounter.entity'
import { ClientAdditionalInformationCounterValue } from './entitites/clientAdditionalInformationCounterValue.entity'
import { ClientAdditionalInformationParticipationCompany } from './entitites/clientAdditionalInformationParticipationCompany.entity'
import { ClientAdditionalInformationRevenue } from './entitites/clientAdditionalInformationRevenue.entity'
import { ClientCadastralCheck } from './entitites/clientCadastralCheck.entity'
import { ClientDocument } from './entitites/clientDocument.entity'
import { ClientDocumentBalance } from './entitites/clientDocumentBalance.entity'
import { ClientDocumentContractualAlteration } from './entitites/clientDocumentContractualAlteration.entity'
import { ClientDocumentGeneral } from './entitites/clientDocumentGeneral.entity'
import { ClientDocumentPre } from './entitites/clientDocumentPre.entity'
import { ClientFinancial } from './entitites/clientFinancial.entity'
import { ClientFiscalInformation } from './entitites/clientFiscalInformation.entity'
import { ClientFiscalParametrization } from './entitites/clientFiscalParametrization.entity'
import { ClientFiscalParametrizationCfop } from './entitites/clientFiscalParametrizationCfop.entity'
import { ClientParametrization } from './entitites/clientParametrization.entity'
import { ClientPriceList } from './entitites/clientPriceList.entity'
import { ClientRegistrationInformation } from './entitites/clientRegistrationInformation.entity'
import { WorkflowClientRegister } from './entitites/workflowClientRegister'
import { WorkflowRegisterClientPerformed } from './entitites/workflowClientRegisterPerformed.entity'
import { StatusEnum } from './enum/status.enum'
import {
  WorkflowClientRegisterSet,
  ClientAdditionalInformationSet,
  ClientFinancialSet,
  ClientFiscalInformationSet,
  ClientPametrizationSet,
  ClientDocumentSet
} from './set/RequiredFIeldsClientRegister.set'
@Injectable()
export class WorkflowClientRegisterService {
  constructor(
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(FilesService) private fileService: FilesService,
    @InjectModel(File)
    private file: typeof File,
    @InjectModel(WorkflowRegisterClientPerformed)
    private workflowRegisterClientPerformed: typeof WorkflowRegisterClientPerformed,
    @Inject(WorkflowPerformedService)
    private workflowPerformedService: WorkflowPerformedService,
    @InjectModel(WorkflowPerformed)
    private workflowPerformed: typeof WorkflowPerformed,
    @InjectModel(WorkflowClientRegister)
    private workflowClientRegister: typeof WorkflowClientRegister,
    @InjectModel(ClientRegistrationInformation)
    private clientRegistrationInformation: typeof ClientRegistrationInformation,
    @InjectModel(ClientPriceList)
    private clientPriceList: typeof ClientPriceList,
    @InjectModel(ClientParametrization)
    private clientParametrization: typeof ClientParametrization,
    @InjectModel(ClientFiscalParametrizationCfop)
    private clientFiscalParametrizationCfop: typeof ClientFiscalParametrizationCfop,
    @InjectModel(ClientFiscalParametrization)
    private clientFiscalParametrization: typeof ClientFiscalParametrization,
    @InjectModel(ClientFiscalInformation)
    private clientFiscalInformation: typeof ClientFiscalInformation,
    @InjectModel(ClientFinancial)
    private clientFinancial: typeof ClientFinancial,
    @InjectModel(ClientDocumentPre)
    private clientDocumentPre: typeof ClientDocumentPre,
    @InjectModel(ClientDocumentGeneral)
    private clientDocumentGeneral: typeof ClientDocumentGeneral,
    @InjectModel(ClientDocumentContractualAlteration)
    private clientDocumentContractualAlteration: typeof ClientDocumentContractualAlteration,
    @InjectModel(ClientDocumentBalance)
    private clientDocumentBalance: typeof ClientDocumentBalance,
    @InjectModel(ClientDocument)
    private clientDocument: typeof ClientDocument,
    @InjectModel(ClientCadastralCheck)
    private clientCadastralCheck: typeof ClientCadastralCheck,
    @InjectModel(ClientAdditionalInformationRevenue)
    private clientAdditionalInformationRevenue: typeof ClientAdditionalInformationRevenue,
    @InjectModel(ClientAdditionalInformationCounter)
    private clientAdditionalInformationCounter: typeof ClientAdditionalInformationCounter,
    @InjectModel(ClientAdditionalInformationCounterValue)
    private clientAdditionalInformationCounterValue: typeof ClientAdditionalInformationCounterValue,
    @InjectModel(ClientAdditionalInformationParticipationCompany)
    private clientAdditionalInformationParticipationCompany: typeof ClientAdditionalInformationParticipationCompany,
    @InjectModel(ClientAdditionalInformationCommercialReference)
    private clientAdditionalInformationCommercialReference: typeof ClientAdditionalInformationCommercialReference,
    @InjectModel(ClientAdditionalInformationBankReference)
    private clientAdditionalInformationBankReference: typeof ClientAdditionalInformationBankReference,
    @InjectModel(ClientAdditionalInformation)
    private clientAdditionalInformation: typeof ClientAdditionalInformation,
    @InjectModel(WorkflowTask)
    private workflowTask: typeof WorkflowTask,
    @InjectModel(WorkflowTaskResponse)
    private workflowTaskResponse: typeof WorkflowTaskResponse
  ) {}

  async create(
    data: CreateClientRegisterDto,
    userId: number,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())

    const {
      additionalInformation,
      registrationInformation,
      financial,
      cadastralCheck,
      parametrization,
      priceList,
      fiscalParametrization,
      fiscalParametrizationCfop,
      fiscalInformation,
      documents,
      ...clientRegisterData
    } = data

    const {
      revenues,
      bankReferences,
      commercialReferences,
      counter,
      participationsCompany
    } = additionalInformation
    const { values } = counter

    try {
      const { id: clientRegistrationInformationId } =
        await this.clientRegistrationInformation.create(
          registrationInformation,
          { transaction }
        )

      const { id: clientFinancialId } = await this.clientFinancial.create(
        financial,
        { transaction }
      )

      const { id: clientCadastralCheckId } =
        await this.clientCadastralCheck.create(cadastralCheck, { transaction })

      const { id: clientParametrizationId } =
        await this.clientParametrization.create(parametrization, {
          transaction
        })

      const { id: clientFiscalParametrizationId } =
        await this.clientFiscalParametrization.create(fiscalParametrization, {
          transaction
        })

      const { id: clientFiscalInformationId } =
        await this.clientFiscalInformation.create(fiscalInformation, {
          transaction
        })

      const { id: clientFiscalParametrizationCfopId } =
        await this.clientFiscalParametrizationCfop.create(
          fiscalParametrizationCfop,
          { transaction }
        )

      const { id: clientPriceListId } = await this.clientPriceList.create(
        priceList,
        { transaction }
      )

      let clientFiscalDocumentId = null
      if (documents) {
        const {
          balanceFileIds,
          preFileIds,
          generalFileIds,
          contractualAlterationFileIds,
          ...restDocuments
        } = documents

        const { id: documentId } = await this.clientDocument.create(
          restDocuments,
          { transaction }
        )

        clientFiscalDocumentId = documentId

        await this.multipleDocumentsInsert(
          documentId,
          balanceFileIds,
          preFileIds,
          generalFileIds,
          contractualAlterationFileIds,
          transaction
        )
      }

      const { id: clientAdditionalInformationId } =
        await this.clientAdditionalInformation.create(additionalInformation, {
          transaction
        })

      const { id: clientAdditionalInformationCounterId } =
        await this.clientAdditionalInformationCounter.create(
          {
            ...counter,
            clientAdditionalInformationId
          },
          { transaction }
        )

      if (values[0])
        await this.multipleCreate(
          this.clientAdditionalInformationCounterValue,
          'clientAdditionalInformationCounterId',
          clientAdditionalInformationCounterId,
          values,
          transaction,
          false
        )

      await this.clientAdditionalInformationMultipleInsert(
        clientAdditionalInformationId,
        revenues,
        bankReferences,
        commercialReferences,
        participationsCompany,
        transaction
      )

      const { id } = await this.workflowClientRegister.create(
        {
          ...clientRegisterData,
          clientAdditionalInformationId,
          clientCadastralCheckId,
          clientFinancialId,
          clientFiscalInformationId,
          clientParametrizationId,
          clientFiscalParametrizationId,
          clientFiscalDocumentId,
          clientRegistrationInformationId,
          clientFiscalParametrizationCfopId,
          clientPriceListId,
          updatedBy: userId,
          createdBy: userId
        },
        { transaction }
      )

      if (!trx) transaction.commit()

      return id
    } catch (err) {
      if (!trx) await transaction.rollback()

      throw new InternalServerErrorException(
        'Ocorreu um erro ao salvar o pré-cadastro de cliente'
      )
    }
  }

  async multipleCreate<M extends { new (): any } & typeof Model>(
    model: M,
    key: string,
    keyValue: number,
    data: Object[] | number[],
    transaction: Transaction,
    isDocument: boolean
  ): Promise<void> {
    const insert = !isDocument
      ? data.map((value) => ({
          [key]: keyValue,
          ...value
        }))
      : data.map((fileId) => ({
          [key]: keyValue,
          fileId
        }))
    await model.bulkCreate(insert, { transaction })
  }

  async multipleUpdate<
    M extends typeof Model & { new (): any },
    Object extends { id: number }
  >(model: M, data: Object[], transaction: Transaction): Promise<void> {
    await Promise.all(
      data.map(async (value) => {
        await model.update(value, {
          where: {
            id: value.id
          },
          transaction
        })
      })
    )
  }

  async multipleDelete<T extends typeof Model & { new (): any }>(
    model: T,
    ids: number[],
    transaction: Transaction
  ): Promise<void> {
    await model.destroy({
      where: {
        id: {
          $in: ids
        }
      },
      transaction
    })
  }

  async update(
    data: CreateClientRegisterDto,
    workflowClientRegisterId: number,
    userId: number,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())

    const {
      additionalInformation,
      registrationInformation,
      financial,
      cadastralCheck,
      parametrization,
      priceList,
      fiscalParametrization,
      fiscalParametrizationCfop,
      fiscalInformation,
      documents,
      ...clientUpdateData
    } = data

    const {
      revenues,
      bankReferences,
      commercialReferences,
      counter,
      participationsCompany,
      ...additionalInformationData
    } = additionalInformation

    const { values, ...counters } = counter

    try {
      const workflowClientRegister = await this.workflowClientRegister.findByPk(
        workflowClientRegisterId,
        {
          attributes: ['id'],
          transaction,
          include: [
            {
              model: this.workflowPerformed,
              attributes: ['id'],
              where: {
                concluded: false
              },
              required: false
            },
            {
              model: this.clientPriceList,
              attributes: ['id']
            },
            {
              model: this.clientFinancial,
              attributes: ['id']
            },
            {
              model: this.clientRegistrationInformation,
              attributes: ['id']
            },
            {
              model: this.clientFiscalInformation,
              attributes: ['id']
            },
            {
              model: this.clientCadastralCheck,
              attributes: ['id']
            },
            {
              model: this.clientParametrization,
              attributes: ['id']
            },
            {
              model: this.clientParametrization,
              attributes: ['id']
            },
            {
              model: this.clientFiscalParametrization,
              attributes: ['id']
            },
            {
              model: this.clientFiscalParametrizationCfop,
              attributes: ['id']
            },
            {
              model: this.clientAdditionalInformation,
              attributes: ['id'],
              include: [
                {
                  model: this.clientAdditionalInformationRevenue,
                  attributes: ['id'],
                  required: false
                },
                {
                  model: this.clientAdditionalInformationBankReference,
                  attributes: ['id'],
                  required: false
                },
                {
                  model: this.clientAdditionalInformationCommercialReference,
                  attributes: ['id'],
                  required: false
                },
                {
                  model: this.clientAdditionalInformationParticipationCompany,
                  attributes: ['id'],
                  required: false
                },
                {
                  model: this.clientAdditionalInformationCounter,
                  as: 'counter',
                  attributes: ['id'],
                  include: [ClientAdditionalInformationCounterValue]
                }
              ]
            },
            {
              model: this.clientDocument,
              include: [
                {
                  model: this.clientDocumentBalance,
                  required: false
                },
                {
                  model: this.clientDocumentPre,
                  required: false
                },
                {
                  model: this.clientDocumentGeneral,
                  required: false
                },
                {
                  model: this.clientDocumentContractualAlteration,
                  required: false
                }
              ]
            }
          ]
        }
      )

      if (!workflowClientRegister)
        throw new BadRequestException('Pré-cadastro de cliente não encontrado')

      if (workflowClientRegister.performed)
        throw new BadRequestException(
          'Este cliente possui um fluxo de trabalho em execução'
        )

      const valuesToCreate = values.filter((values) => !values.id)
      const valuesToUpdate = values.filter((value) => value.id)
      const valuesToDeleteIds =
        workflowClientRegister.additionalInformation.counter.values
          .filter(
            (valueRegister) =>
              !values.find((value) => value.id === valueRegister.id)
          )
          .map((value) => value.id)

      if (valuesToCreate[0])
        await this.multipleCreate(
          this.clientAdditionalInformationCounterValue,
          'clientAdditionalInformationCounterId',
          workflowClientRegister.additionalInformation.counter.id,
          valuesToCreate,
          transaction,
          false
        )

      if (valuesToUpdate[0])
        await this.multipleUpdate(
          this.clientAdditionalInformationCounterValue,
          valuesToUpdate,
          transaction
        )

      if (valuesToDeleteIds[0])
        await this.multipleDelete(
          this.clientAdditionalInformationCounterValue,
          valuesToDeleteIds,
          transaction
        )

      await Promise.all([
        await workflowClientRegister.update(
          { ...clientUpdateData, updatedBy: userId },
          {
            transaction
          }
        ),
        await workflowClientRegister.priceList.update(priceList, {
          transaction
        }),
        await workflowClientRegister.additionalInformation.counter.update(
          counters,
          {
            transaction
          }
        ),
        await workflowClientRegister.additionalInformation.update(
          additionalInformationData,
          {
            transaction
          }
        ),
        await workflowClientRegister.parametrization.update(parametrization, {
          transaction
        }),
        await workflowClientRegister.cfop.update(fiscalParametrizationCfop, {
          transaction
        }),
        await workflowClientRegister.fiscalParametrization.update(
          fiscalParametrization,
          {
            transaction
          }
        ),
        await workflowClientRegister.financial.update(financial, {
          transaction
        }),
        await workflowClientRegister.registrationInformation.update(
          registrationInformation,
          {
            transaction
          }
        ),
        await workflowClientRegister.fiscalInformation.update(
          fiscalInformation,
          {
            transaction
          }
        ),
        await workflowClientRegister.cadastralCheck.update(cadastralCheck, {
          transaction
        })
      ])

      const clientAdditionalInformationId =
        workflowClientRegister.additionalInformation.id

      // CUD CLIENT ADDITIONAL INFORMATION RELAÇÕES 1:N
      await Promise.all([
        await this.clientAdditionalInformationMultipleInsert(
          clientAdditionalInformationId,
          revenues,
          bankReferences,
          commercialReferences,
          participationsCompany,
          transaction
        ),
        await this.clientAdditionalInformationMultipleUpdate(
          revenues,
          bankReferences,
          commercialReferences,
          participationsCompany,
          transaction
        ),
        await this.clientAdditionalInformationMultipleDelete(
          workflowClientRegister.additionalInformation,
          revenues,
          bankReferences,
          commercialReferences,
          participationsCompany,
          transaction
        )
      ])

      if (documents) {
        const {
          balanceFileIds,
          preFileIds,
          generalFileIds,
          contractualAlterationFileIds
        } = documents

        // DELETE DE DOCUMENTOS 1:1
        const documentReference =
          workflowClientRegister.documents.toJSON() as CreateClientDocumentDto

        const documentsToDeleteIds = Object.entries(documents)
          .filter((documentObj) => {
            const [key, value] = documentObj
            return documentReference[key] && !value
          })
          .map((documentObj) => documentReference[documentObj[0]])

        await workflowClientRegister.documents.update(documents, {
          transaction
        })

        await Promise.all(
          documentsToDeleteIds.map(async (fileId: number) => {
            await this.fileService.delete(fileId, userId, transaction)
          })
        )

        // DELETE DE DOCUMENTOS 1:N
        const documentPreToDeleteModels =
          workflowClientRegister.documents.pre.filter(
            (documentPre) =>
              !preFileIds.find((fileId) => fileId === documentPre.fileId)
          )

        await Promise.all(
          documentPreToDeleteModels.map(async (documentModel) => {
            await documentModel.destroy({ transaction })
            await this.fileService.delete(
              documentModel.fileId,
              userId,
              transaction
            )
          })
        )

        const documentBalanceDeleteModels =
          workflowClientRegister.documents.balance.filter(
            (documentBalance) =>
              !balanceFileIds.find(
                (fileId) => fileId === documentBalance.fileId
              )
          )

        await Promise.all(
          documentBalanceDeleteModels.map(async (documentModel) => {
            await documentModel.destroy({ transaction })
            await this.fileService.delete(
              documentModel.fileId,
              userId,
              transaction
            )
          })
        )

        const documentContractualDeleteModels =
          workflowClientRegister.documents.contractualAlteration.filter(
            (documentContractual) =>
              !contractualAlterationFileIds.find(
                (fileId) => fileId === documentContractual.fileId
              )
          )

        await Promise.all(
          documentContractualDeleteModels.map(async (documentModel) => {
            await documentModel.destroy({ transaction })
            await this.fileService.delete(
              documentModel.fileId,
              userId,
              transaction
            )
          })
        )

        const documentGeneralDeleteModels =
          workflowClientRegister.documents.balance.filter(
            (documentGeneral) =>
              !generalFileIds.find(
                (fileId) => fileId === documentGeneral.fileId
              )
          )

        await Promise.all(
          documentGeneralDeleteModels.map(async (documentModel) => {
            await documentModel.destroy({ transaction })
            await this.fileService.delete(
              documentModel.fileId,
              userId,
              transaction
            )
          })
        )

        // CRIAÇÃO DE DOCUMENTOS 1:N
        const clientFiscalDocumentId = workflowClientRegister.documents.id

        const documentGeneralToCreateIds = generalFileIds.filter(
          (fileId) =>
            !workflowClientRegister.documents.general
              .map((file) => file.fileId)
              .includes(fileId)
        )

        const documentPreToCreateIds = preFileIds.filter(
          (fileId) =>
            !workflowClientRegister.documents.pre
              .map((file) => file.fileId)
              .includes(fileId)
        )

        const documentBalanceToCreateIds = balanceFileIds.filter(
          (fileId) =>
            !workflowClientRegister.documents.balance
              .map((file) => file.fileId)
              .includes(fileId)
        )

        const documentContractualAlterationToCreateIds =
          contractualAlterationFileIds.filter(
            (fileId) =>
              !workflowClientRegister.documents.contractualAlteration
                .map((file) => file.fileId)
                .includes(fileId)
          )

        await this.multipleDocumentsInsert(
          clientFiscalDocumentId,
          documentBalanceToCreateIds,
          documentPreToCreateIds,
          documentGeneralToCreateIds,
          documentContractualAlterationToCreateIds,
          transaction
        )
      }

      if (!trx) transaction.commit()
      return workflowClientRegister.id
    } catch (err) {
      if (!trx) transaction.rollback()

      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o pré-cadastro de cliente'
      )
    }
  }

  async clientAdditionalInformationMultipleInsert(
    clientAdditionalInformationId: number,
    revenues: CreateClientAdditionalInformationRevenueDto[],
    bankReferences: CreateClientAdditionalInformationBankReferenceDto[],
    commercialReferences: CreateClientAdditionalInformationCommercialReferenceDto[],
    participationsCompany: CreateClientAdditionalInformationParticipationCompanyDto[],
    transaction: Transaction
  ): Promise<void> {
    const revenuesToCreate = revenues.filter((revenue) => !revenue.id)
    if (revenuesToCreate[0])
      await this.multipleCreate(
        this.clientAdditionalInformationRevenue,
        'clientAdditionalInformationId',
        clientAdditionalInformationId,
        revenuesToCreate,
        transaction,
        false
      )
    const bankReferencesToCreate = bankReferences.filter(
      (bankReference) => !bankReference.id
    )
    if (bankReferencesToCreate[0])
      await this.multipleCreate(
        this.clientAdditionalInformationBankReference,
        'clientAdditionalInformationId',
        clientAdditionalInformationId,
        bankReferencesToCreate,
        transaction,
        false
      )
    const commercialReferencesToCreate = commercialReferences.filter(
      (commercialReference) => !commercialReference.id
    )
    if (commercialReferencesToCreate[0])
      await this.multipleCreate(
        this.clientAdditionalInformationCommercialReference,
        'clientAdditionalInformationId',
        clientAdditionalInformationId,
        commercialReferencesToCreate,
        transaction,
        false
      )
    const participationsCompanyToCreate = participationsCompany.filter(
      (participationCompany) => !participationCompany.id
    )
    if (participationsCompanyToCreate[0])
      await this.multipleCreate(
        this.clientAdditionalInformationParticipationCompany,
        'clientAdditionalInformationId',
        clientAdditionalInformationId,
        participationsCompanyToCreate,
        transaction,
        false
      )
  }

  async clientAdditionalInformationMultipleUpdate(
    revenues: CreateClientAdditionalInformationRevenueDto[],
    bankReferences: CreateClientAdditionalInformationBankReferenceDto[],
    commercialReferences: CreateClientAdditionalInformationCommercialReferenceDto[],
    participationsCompany: CreateClientAdditionalInformationParticipationCompanyDto[],
    transaction: Transaction
  ): Promise<void> {
    const revenuesToUpdate = revenues.filter((revenue) => revenue.id)
    if (revenuesToUpdate[0])
      await this.multipleUpdate(
        this.clientAdditionalInformationRevenue,
        revenuesToUpdate,
        transaction
      )
    const bankReferencesToUpdate = bankReferences.filter(
      (bankReference) => bankReference.id
    )
    if (bankReferencesToUpdate[0])
      await this.multipleUpdate(
        this.clientAdditionalInformationBankReference,
        bankReferencesToUpdate,
        transaction
      )
    const commercialReferencesToUpdate = commercialReferences.filter(
      (commercialReference) => commercialReference.id
    )
    if (commercialReferencesToUpdate[0])
      await this.multipleUpdate(
        this.clientAdditionalInformationCommercialReference,
        commercialReferencesToUpdate,
        transaction
      )
    const participationsCompanyToUpdate = participationsCompany.filter(
      (participationCompany) => participationCompany.id
    )
    if (participationsCompanyToUpdate[0])
      await this.multipleUpdate(
        this.clientAdditionalInformationParticipationCompany,
        participationsCompanyToUpdate,
        transaction
      )
  }

  async clientAdditionalInformationMultipleDelete(
    clientAdditionalInformation: ClientAdditionalInformation,
    revenues: CreateClientAdditionalInformationRevenueDto[],
    bankReferences: CreateClientAdditionalInformationBankReferenceDto[],
    commercialReferences: CreateClientAdditionalInformationCommercialReferenceDto[],
    participationsCompany: CreateClientAdditionalInformationParticipationCompanyDto[],
    transaction: Transaction
  ): Promise<void> {
    const bankReferencesToDeleteIds = clientAdditionalInformation.bankReferences
      .filter(
        (bankReferenceRegister) =>
          !bankReferences.find(
            (bankReference) => bankReference.id === bankReferenceRegister.id
          )
      )
      .map((bankReference) => bankReference.id)
    if (bankReferencesToDeleteIds[0])
      await this.multipleDelete(
        this.clientAdditionalInformationBankReference,
        bankReferencesToDeleteIds,
        transaction
      )
    const commercialReferencesToDeleteIds =
      clientAdditionalInformation.commercialReferences
        .filter(
          (commercialReferenceRegister) =>
            !commercialReferences.find(
              (commercialReference) =>
                commercialReference.id === commercialReferenceRegister.id
            )
        )
        .map((commercialReference) => commercialReference.id)
    if (commercialReferencesToDeleteIds[0])
      await this.multipleDelete(
        this.clientAdditionalInformationCommercialReference,
        commercialReferencesToDeleteIds,
        transaction
      )

    const participationsCompanyToDeleteIds =
      clientAdditionalInformation.participationsCompany
        .filter(
          (participationCompanyRegister) =>
            !participationsCompany.find(
              (participationCompany) =>
                participationCompany.id === participationCompanyRegister.id
            )
        )
        .map((participationCompany) => participationCompany.id)

    if (participationsCompanyToDeleteIds[0]) {
      await this.multipleDelete(
        this.clientAdditionalInformationParticipationCompany,
        participationsCompanyToDeleteIds,
        transaction
      )
    }
    const revenuesToDeleteIds = clientAdditionalInformation.revenues
      .filter(
        (revenueRegister) =>
          !revenues.find((revenue) => revenue.id === revenueRegister.id)
      )
      .map((revenue) => revenue.id)
    if (revenuesToDeleteIds[0])
      await this.multipleDelete(
        this.clientAdditionalInformationRevenue,
        revenuesToDeleteIds,
        transaction
      )
  }

  async multipleDocumentsInsert(
    clientFiscalDocumentId: number,
    balanceFileIds: any[],
    preFileIds: any[],
    generalFileIds: any[],
    contractualAlterationFileIds: any[],
    transaction: Transaction
  ): Promise<void> {
    if (balanceFileIds?.length)
      await this.multipleCreate(
        this.clientDocumentBalance,
        'clientDocumentId',
        clientFiscalDocumentId,
        balanceFileIds,
        transaction,
        true
      )
    if (preFileIds?.length)
      await this.multipleCreate(
        this.clientDocumentPre,
        'clientDocumentId',
        clientFiscalDocumentId,
        preFileIds,
        transaction,
        true
      )
    if (generalFileIds?.length)
      await this.multipleCreate(
        this.clientDocumentGeneral,
        'clientDocumentId',
        clientFiscalDocumentId,
        generalFileIds,
        transaction,
        true
      )
    if (contractualAlterationFileIds?.length)
      await this.multipleCreate(
        this.clientDocumentContractualAlteration,
        'clientDocumentId',
        clientFiscalDocumentId,
        contractualAlterationFileIds,
        transaction,
        true
      )
  }

  async startWorkflow(
    workflowClientRegisterId: number,
    userId: number,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())

    try {
      await this.validateRequiredFields(workflowClientRegisterId)
      const workflowClientRegister = await this.workflowClientRegister.findByPk(
        workflowClientRegisterId,
        {
          attributes: ['id'],
          include: [
            {
              model: this.workflowPerformed,
              where: {
                concluded: false
              },
              required: false
            }
          ]
        }
      )

      if (!workflowClientRegister)
        throw new BadRequestException('Cliente não encontrado')

      if (workflowClientRegister.performed)
        throw new BadRequestException(
          'Este cliente já possui um fluxo de trabalho em execução'
        )

      const workflowPerformedId =
        await this.workflowPerformedService.startWorkflow(
          WorkflowTypeEnum.PCC,
          userId,
          transaction,
          workflowClientRegisterId
        )
      workflowClientRegister.workflowPerformedId = workflowPerformedId
      await workflowClientRegister.save({ transaction })
      await this.workflowRegisterClientPerformed.create(
        {
          workflowPerformedId,
          workflowRegisterClientId: workflowClientRegisterId
        },
        { transaction }
      )
      if (!trx) await transaction.commit()
      return workflowPerformedId
    } catch (err) {
      if (!trx) await transaction.rollback()
      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro ao iniciar o fluxo de trabalho de pré-cadastro de cliente'
      )
    }
  }

  /**
   * Valida o pré-cadastro de cliente
   * @param workflowClientRegisterId number
   * @returns Promise<boolean>
   */
  async validateRequiredFields(
    workflowClientRegisterId: number
  ): Promise<boolean> {
    const workflowClientRegister = await this.workflowClientRegister.findByPk(
      workflowClientRegisterId,
      {
        include: [
          {
            model: this.clientFinancial
          },
          {
            model: this.clientAdditionalInformation,
            include: [
              {
                model: this.clientAdditionalInformationCounter
              }
            ]
          },
          {
            model: this.clientRegistrationInformation
          },
          {
            model: this.clientFiscalInformation
          },
          {
            model: this.clientCadastralCheck
          },
          {
            model: this.clientParametrization
          },
          {
            model: this.clientPriceList
          },
          {
            model: this.clientParametrization
          },
          {
            model: this.clientFiscalParametrizationCfop
          },
          {
            model: this.clientDocument,
            include: [
              {
                model: this.clientDocumentBalance
              },
              {
                model: this.clientDocumentPre
              },
              {
                model: this.clientDocumentGeneral
              },
              {
                model: this.clientDocumentContractualAlteration
              }
            ]
          }
        ]
      }
    )

    if (!workflowClientRegister)
      throw new BadRequestException(
        'Este cliente não possui o cadastro completo'
      )

    const notIn = []

    WorkflowClientRegisterSet.forEach((value: keyof WorkflowClientRegister) => {
      if (!workflowClientRegister.getDataValue(value)) notIn.push(value)
    })

    ClientAdditionalInformationSet.forEach(
      (value: keyof ClientAdditionalInformation) => {
        if (!workflowClientRegister.additionalInformation.getDataValue(value))
          notIn.push(value)
      }
    )

    ClientFiscalInformationSet.forEach(
      (value: keyof ClientFiscalInformation) => {
        if (!workflowClientRegister.fiscalInformation.getDataValue(value))
          notIn.push(value)
      }
    )

    ClientFinancialSet.forEach((value: keyof ClientFinancial) => {
      if (!workflowClientRegister.financial.getDataValue(value))
        notIn.push(value)
    })

    ClientPametrizationSet.forEach((value: keyof ClientParametrization) => {
      if (!workflowClientRegister.parametrization.getDataValue(value))
        notIn.push(value)
    })

    ClientDocumentSet.forEach((value: keyof ClientDocument) => {
      if (!workflowClientRegister.documents.getDataValue(value))
        notIn.push(value)
    })

    if (notIn[0])
      throw new BadRequestException(
        `Os campos [${ notIn.join(', ') }] são obrigatórios`
      )

    return true
  }

  /**
   * Irá retornar o pré registro do cliente
   * @param workflowClientRegisterId number
   */
  async getPreRegister(
    workflowClientRegisterId: number,
    userId: number
  ): Promise<FindDetailsClientRegisterDto> {
    const workflowClientRegister = await this.workflowClientRegister.findByPk(
      workflowClientRegisterId,
      {
        include: [
          {
            model: this.clientAdditionalInformation,
            include: [
              {
                model: this.clientAdditionalInformationCounter,
                include: [
                  {
                    model: this.clientAdditionalInformationCounterValue
                  }
                ]
              },
              {
                model: this.clientAdditionalInformationCommercialReference
              },
              {
                model: this.clientAdditionalInformationParticipationCompany
              },
              {
                model: this.clientAdditionalInformationRevenue
              },
              {
                model: this.clientAdditionalInformationBankReference
              }
            ]
          },
          {
            model: this.clientRegistrationInformation
          },
          {
            model: this.clientFiscalParametrization
          },
          {
            model: this.clientFinancial
          },
          {
            model: this.clientFiscalInformation
          },
          {
            model: this.clientCadastralCheck
          },
          {
            model: this.clientParametrization
          },
          {
            model: this.clientPriceList
          },
          {
            model: this.clientParametrization
          },
          {
            model: this.clientFiscalParametrizationCfop
          },
          {
            model: this.clientDocument,
            include: [
              {
                model: this.file,
                as: 'socialContractFile'
              },
              {
                model: this.file,
                as: 'registrationFormFile'
              },
              {
                model: this.file,
                as: 'invoiceFile'
              },
              {
                model: this.file,
                as: 'billingRatioFile'
              },
              {
                model: this.file,
                as: 'currentBalanceSheetFile'
              },
              {
                model: this.file,
                as: 'lpIncomeTaxFile'
              },
              {
                model: this.file,
                as: 'fpIncomeTaxFile'
              },
              {
                model: this.file,
                as: 'defisDasnFile'
              },
              {
                model: this.file,
                as: 'pgdasFile'
              },
              {
                model: this.file,
                as: 'holderDocumentFile'
              },
              {
                model: this.file,
                as: 'holderDriverLicenseFile'
              },
              {
                model: this.file,
                as: 'residenceProofFile'
              },
              {
                model: this.file,
                as: 'specialRegimeLetterStFile'
              },
              {
                model: this.file,
                as: 'letterOfTaxationRegimeFile'
              },
              {
                model: this.file,
                as: 'genericConsultationMatoGrossoFile'
              },
              {
                model: this.file,
                as: 'nationalSimpleConsultationFile'
              },
              {
                model: this.file,
                as: 'nationalSimpleConsultationFile'
              },
              {
                model: this.file,
                as: 'syntacticQueryFile'
              },
              {
                model: this.clientDocumentBalance,
                required: false,
                include: [
                  {
                    model: this.file
                  }
                ]
              },
              {
                model: this.clientDocumentPre,
                include: [
                  {
                    model: this.file
                  }
                ],
                required: false
              },
              {
                model: this.clientDocumentGeneral,
                include: [
                  {
                    model: this.file
                  }
                ],
                required: false
              },
              {
                model: this.clientDocumentContractualAlteration,
                include: [
                  {
                    model: this.file
                  }
                ],
                required: false
              }
            ]
          }
        ]
      }
    )

    if (!workflowClientRegister)
      throw new BadRequestException('Pré cadastro do cliente não encontrado')

    const workflowInProgress = await this.findWorkflowInProgress(
      workflowClientRegisterId
    )

    const workflowTaskInProgress = workflowInProgress
      ? await this.workflowPerformedService.findWorkflowTaskInProgress(
          workflowClientRegister.workflowPerformedId,
          userId,
          true
        )
      : null

    return {
      ...(workflowClientRegister.toJSON() as any),
      status: await this.findStatusClient(
        workflowClientRegister.workflowPerformedId
      ),
      workflowTaskInProgress
    }
  }

  /**
   * Irá retornar o status atual do cliente
   * @param workflowPerformedId number
   */
  async findStatusClient(workflowPerformedId: number): Promise<string> {
    if (!workflowPerformedId) return StatusEnum.OPEN

    const task = await this.workflowTask.findOne({
      where: {
        id: {
          $eq: Sequelize.literal(
            `(SELECT [VWPCT].[workflowTaskId] FROM [vw_workflows_performed_current_task] AS [VWPCT] WHERE [VWPCT].[workflowPerformedId] = ${ workflowPerformedId })`
          )
        }
      },
      attributes: ['title']
    })
    if (task) return task.title

    const { workflowTaskResponse } =
      await this.workflowPerformedService.findLastWorkflowPerformedResponse(
        workflowPerformedId,
        true
      )
    return workflowTaskResponse.finishWorkflowSuccessfully
      ? StatusEnum.CONCLUDED
      : StatusEnum.CANCELED
  }

  /**
   * Busca todos os registros de pré cadastro de cliente
   * @param query ClientQueryDto
   * @param tokenBritania string
   */
  async getPreRegistrationParentCompanies(
    query: ClientQueryDto
  ): Promise<PagedResult<ParentCompanyDto>> {
    const result: PagedResult<ParentCompanyDto> = {
      totalRegisters: 0,
      data: []
    }
    let workflowPerformedIds: number[] = null
    if (query.workflowTypeId || query.workflowId || query.workflowTaskId) {
      const workflows =
        await this.workflowPerformedService.getWorkflowTasksInProgress(
          query.workflowTypeId,
          query.workflowId,
          query.workflowTaskId
        )

      workflowPerformedIds = workflows.map(
        (workflow) => workflow.workflowPerformedId
      )

      if (!workflowPerformedIds.length) return result
    }

    const queryOptions = {
      where: {
        ...((query.companyName || query.parentCompany) && {
          companyName: {
            $like: `%${ query.parentCompany ?? query.companyName }%`
          }
        }),
        ...(query.cnpj && { cnpj: query.cnpj }),
        ...(query.state && { state: query.state }),
        ...(query.city && { city: query.city }),
        ...(workflowPerformedIds && {
          workflowPerformedId: workflowPerformedIds
        })
      },
      include: [
        {
          model: WorkflowPerformed,
          required: false,
          where: {
            ...((!query.clientRegistrationStatus ||
            query.clientRegistrationStatus === ClientRegistrationStatusEnum.BOTH
              ? undefined
              : query.clientRegistrationStatus ===
                ClientRegistrationStatusEnum.ACTIVE) !== undefined && {
              concluded:
                !query.clientRegistrationStatus ||
                query.clientRegistrationStatus ===
                  ClientRegistrationStatusEnum.BOTH
                  ? undefined
                  : query.clientRegistrationStatus ===
                    ClientRegistrationStatusEnum.ACTIVE
            })
          },
          include: [
            {
              model: Workflow,
              where: {
                ...(query.workflowId && { id: query.workflowId }),
                ...(query.workflowTypeId && {
                  workflowTypeId: query.workflowTypeId
                })
              }
            }
          ]
        },
        {
          model: ClientParametrization,
          where: {
            ...(query.clientGroup && { clientGroup: query.clientGroup }),
            ...(query.parentCompanyCode && {
              parentCompanyCode: query.parentCompanyCode
            })
          }
        }
      ]
    }

    result.totalRegisters = await this.workflowClientRegister.count(
      queryOptions
    )
    const clients = await this.workflowClientRegister.findAll({
      ...queryOptions,
      ...convertToFindOptions(query.page, query.pageSize),
      ...(query.orderBy &&
        query.orderBy === ClientOrderByEnum.PARENT_COMPANY && {
          order: [['companyName', query.sort ?? 'ASC']]
        })
    })
    result.data = clients.map((client) => ({
      id: client.id,
      regimeLetter: null,
      active: client.performed?.concluded === false,
      branchCount: 0,
      cnpj: client.cnpj,
      creditSituation: null,
      daysWithoutBilling: null,
      logisticInformation: null,
      parentCompany: client.companyName,
      parentCompanyCode: null,
      ranking: null,
      businessName: null,
      status:
        client.performed?.concluded === false
          ? ClientStatusEnum.ACTIVE
          : ClientStatusEnum.INACTIVE,
      clientRegistrationType: ClientRegistrationTypeEnum.PRE_REGISTRATION
    }))

    return result
  }

  findWorkflowInProgress(
    workflowClientRegisterId: number
  ): Promise<WorkflowClientRegister> {
    return this.workflowClientRegister.findByPk(workflowClientRegisterId, {
      attributes: ['id'],
      include: [
        {
          model: this.workflowPerformed,
          where: {
            concluded: false
          },
          attributes: ['id']
        }
      ]
    })
  }

  /**
   * Avança uma etapa no workflow de ranking de cliente
   * @param workflowClientRegisterId number
   * @param userId number
   * @param data WorkflowPerformedResponseDto
   */
  async advanceWorkflow(
    workflowClientRegisterId: number,
    userId: number,
    data: WorkflowPerformedResponseDto,
    transaction: Transaction
  ): Promise<void> {
    try {
      const workflowInProgress = await this.findWorkflowInProgress(
        workflowClientRegisterId
      )
      if (!workflowInProgress)
        throw new BadRequestException(
          'Não há um fluxo de trabalho em andamento para este cliente'
        )

      await this.workflowPerformedService.advanceWorkflow(
        workflowInProgress.performed.id,
        userId,
        data,
        transaction
      )
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error
      throw new InternalServerErrorException(
        'Ocorreu um erro ao avançar o fluxo de trabalho de pré-cadastro de cliente'
      )
    }
  }

  /**
   * Busca o histórico de workflows do registro do cliente
   * @param workflowClientRegisterId number
   */
  async findWorkflowHistory(
    workflowClientRegisterId: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    const workflowsHistoryQuery =
      this.workflowPerformedService.findWorkflowsHistoryQuery()

    const workflowClient = await this.workflowClientRegister.findByPk(
      workflowClientRegisterId,
      {
        include: [
          {
            model: this.workflowRegisterClientPerformed,
            ...workflowsHistoryQuery
          }
        ],
        attributes: ['id']
      }
    )

    return workflowClient.clientPerformeds.map((performed) =>
      this.workflowPerformedService.formatWorkflowToHistory(
        performed.workflowPerformed
      )
    )
  }

  /**
   * Busca  o histórico de tarefas da execução de um workflow do registro do cliente
   * @param workflowClientRegisterId number
   * @param workflowPerformedId number
   */
  async findPerformedWorkflowHistory(
    workflowClientRegisterId: number,
    workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    const workflowsPerformedHistoryQuery =
      this.workflowPerformedService.findWorkflowsPerformedHistoryQuery(
        workflowPerformedId
      )
    const workflowClient = await this.workflowClientRegister.findByPk(
      workflowClientRegisterId,
      {
        include: [
          {
            model: this.workflowRegisterClientPerformed,
            ...workflowsPerformedHistoryQuery
          }
        ],
        attributes: ['id']
      }
    )
    if (!workflowClient)
      throw new BadRequestException(
        'Histórico do do fluxo de trabalho de cliente não encontrado'
      )
    return this.workflowPerformedService.formatWorkflowToPerformedHistory(
      workflowClient.clientPerformeds[0].workflowPerformed
    )
  }
}
