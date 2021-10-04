import {
  Injectable,
  Inject,
  BadRequestException,
  InternalServerErrorException,
  NotImplementedException,
  HttpException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Transaction, Sequelize, Model } from 'sequelize'

import { getUtcDate } from '../../../utils/dates/dateUtils'
import { File } from '../../files/entities/file.entity'
import { FilesService } from '../../files/files.service'
import { WorkflowTypeEnum } from '../../workflows/enum/workflowType.enum'
import { ApproverFilterDto } from '../../workflowsPerformed/dtos/hierarchyFilter.dto'
import { WorkflowPerformedHistoryDto } from '../../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { WorkflowPerformed } from '../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedService } from '../../workflowsPerformed/workflowPerformed.service'
import { CreateWorkflowNdDto } from './dto/create/createWorkflowVcpNd.dto'
import { CreateWorkflowVpcDto } from './dto/create/createWorkflowVpc.dto'
import { CreateWorkflowVpcAttachmentDto } from './dto/create/createWorkflowVpcAttachment.dto'
import { CreateWorkflowVpcLineFamilyDto } from './dto/create/createWorkflowVpcLineFamily.dto'
import { CreateWorkflowProductDto } from './dto/create/createWorkflowVpcProduct.dto'
import { CreateWorkflowVpcRequestDto } from './dto/create/createWorkflowVpcRequest.dto'
import { UpdateWorkflowVpcDto } from './dto/update/updateWorkflowVpc.dto'
import { UpdateWorkflowAttachemntDto } from './dto/update/updateWorkflowVpcAttachment.dto'
import { UpdateWorkflowVpcLineFamilyDto } from './dto/update/updateWorkflowVpcLineFamily.dto'
import { updateWorkflowVpcNd } from './dto/update/updateWorkflowVpcNd.dto'
import { UpdateWorkflowVpcProductDto } from './dto/update/updateWorkflowVpcProduct.dto'
import { UpdateWorkflowVpcRequestDto } from './dto/update/updateWorkflowVpcRequest.dto'
import { WorkflowVpc } from './entities/workflowVpc.entity'
import { WorkflowVpcAttachment } from './entities/workflowVpcAttachments.entity'
import { WorkflowVpcLineFamily } from './entities/workflowVpcLineFamily.entity'
import { WorkflowVpcNd } from './entities/workflowVpcNd.entity'
import { WorkflowVpcPerformed } from './entities/workflowVpcPerformed.entity'
import { WorkflowVpcProduct } from './entities/workflowVpcProduct.entity'
import { WorkflowVpcRequest } from './entities/workflowVpcRequests.entity'
import { WorkflowVpcStatus } from './entities/workflowVpcStatus.entity'
import { StatusEnum } from './enum/status.enum'

const requiredFieldsVpc = new Set([
  'cnpj',
  'parentCompanyCode',
  'parentCompanyName',
  'foundsType',
  'paymentType',
  'value',
  'campaignReason',
  'startDate',
  'endDate',
  'directorshipCode',
  'directorshipDescription',
  'approverDescription',
  'approverCode'
])

@Injectable()
export class WorkflowVpcService {
  constructor(
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(WorkflowPerformedService)
    private workflowPerformedService: WorkflowPerformedService,
    @Inject(FilesService)
    private filesService: FilesService,
    @InjectModel(WorkflowVpc) private workflowVpc: typeof WorkflowVpc,
    @InjectModel(WorkflowVpcAttachment)
    private workflowVpcAttachment: typeof WorkflowVpcAttachment,
    @InjectModel(WorkflowVpcLineFamily)
    private workflowVpcLineFamily: typeof WorkflowVpcLineFamily,
    @InjectModel(WorkflowVpcNd) private workflowVpcNd: typeof WorkflowVpcNd,
    @InjectModel(WorkflowVpcProduct)
    private workflowVpcProduct: typeof WorkflowVpcProduct,
    @InjectModel(WorkflowVpcRequest)
    private workflowVpcRequest: typeof WorkflowVpcRequest,
    @InjectModel(WorkflowPerformed)
    private workflowPerformed: typeof WorkflowPerformed,
    @InjectModel(WorkflowVpcPerformed)
    private workflowVpcPerformed: typeof WorkflowVpcPerformed,
    @InjectModel(File)
    private file: typeof File,
    @InjectModel(WorkflowVpcStatus)
    private workflowVpcStatus: typeof WorkflowVpcStatus
  ) {}

  /**
   * Irá criar o VPC e suas relações
   * @param data CreateWorkflowVpcDto
   * @param userId number
   */
  async create(
    data: CreateWorkflowVpcDto,
    userId: number,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())

    try {
      const {
        linesFamilies,
        nds,
        products,
        requests,
        attachments,
        ...createData
      } = data
      const statusId = await this.getIdVpcStatus(StatusEnum.ABERTA, transaction)

      const numberOfrows = await this.workflowVpc.count()
      const requestNumber = `${ (numberOfrows + 1)
        .toString()
        .padStart(7, '0') }VPC`

      const vpc = await this.workflowVpc.create(
        {
          ...createData,
          active: true,
          statusId,
          requestNumber,
          deploymentDate: getUtcDate(),
          createdBy: userId,
          updatedBy: userId
        },
        { transaction }
      )
      if (linesFamilies[0]) {
        await this.multipleCreateInVpc(
          this.workflowVpcLineFamily,
          vpc.id,
          linesFamilies,
          transaction
        )
      }
      if (nds[0]) {
        await this.multipleCreateInVpc(
          this.workflowVpcNd,
          vpc.id,
          nds,
          transaction,
          'active',
          true
        )
      }
      if (products[0]) {
        await this.multipleCreateInVpc(
          this.workflowVpcProduct,
          vpc.id,
          products,
          transaction
        )
      }
      if (requests[0]) {
        await this.multipleCreateInVpc(
          this.workflowVpcRequest,
          vpc.id,
          requests,
          transaction
        )
      }
      if (attachments[0]) {
        await this.multipleCreateInVpc(
          this.workflowVpcAttachment,
          vpc.id,
          attachments,
          transaction
        )
      }
      if (!trx) await transaction.commit()
      return vpc.id
    } catch (err) {
      if (!trx) await transaction.rollback()
      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro ao criar o registro de VPC'
      )
    }
  }

  async multipleCreateInVpc<T extends typeof Model & { new (): any }>(
    model: T,
    workflowVpcId: number,
    data:
      | CreateWorkflowVpcLineFamilyDto[]
      | CreateWorkflowVpcRequestDto[]
      | CreateWorkflowProductDto[]
      | CreateWorkflowNdDto[]
      | CreateWorkflowVpcAttachmentDto[],
    transaction: Transaction,
    fieldKey?: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    fieldValue?: any
  ): Promise<void> {
    const insert = data.map((value) => ({
      workflowVpcId,
      ...value,
      ...(fieldKey && {
        [fieldKey]: fieldValue
      })
    }))
    await model.bulkCreate(insert, { transaction })
  }

  async multipleUpdate<M extends typeof Model & { new (): any }>(
    model: M,
    data:
      | UpdateWorkflowAttachemntDto[]
      | UpdateWorkflowVpcLineFamilyDto[]
      | updateWorkflowVpcNd[]
      | UpdateWorkflowVpcProductDto[]
      | UpdateWorkflowVpcRequestDto[],
    transaction: Transaction
  ): Promise<void> {
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

  async multipleDeleteDocuments(
    documents: WorkflowVpcAttachment[],
    userId: number,
    transaction: Transaction
  ): Promise<void> {
    const ids = documents.map((document) => document.id)
    await this.multipleDelete(this.workflowVpcAttachment, ids, transaction)
    await Promise.all(
      documents.map(async (document) => {
        await this.filesService.delete(document.file.id, userId, transaction)
      })
    )
  }

  /**
   * Retorna o id do status do VPC com
   * base no nome
    @param name StatusEnum
    @param transaction? Transaction
    @returns number
  * */
  async getIdVpcStatus(
    name: StatusEnum,
    transaction?: Transaction
  ): Promise<number> {
    const { id } = await this.workflowVpcStatus.findOne({
      where: {
        name
      },
      attributes: ['id'],
      transaction
    })
    return id
  }

  /**
   * Irá atualizar o VPC e suas relações
   * @param data UpdateWorkflowVpcDto
   * @param vpcId number
   * @param userId number
   * @param trx Transaction
   */
  async update(
    data: UpdateWorkflowVpcDto,
    workflowVpcId: number,
    userId: number,
    trx?: Transaction
  ): Promise<number> {
    const transaction = trx || (await this.db.transaction())
    try {
      const vpc = await this.workflowVpc.findByPk(workflowVpcId, {
        include: [
          {
            model: this.workflowVpcLineFamily,
            required: false,
            attributes: ['id']
          },
          {
            model: this.workflowVpcNd,
            required: false,
            attributes: ['id']
          },
          {
            model: this.workflowVpcRequest,
            required: false,
            attributes: ['id']
          },
          {
            model: this.workflowVpcProduct,
            required: false,
            attributes: ['id']
          },
          {
            model: this.workflowVpcAttachment,
            required: false,
            attributes: ['id'],
            include: [
              {
                model: this.file,
                attributes: ['id']
              }
            ]
          },
          {
            model: this.workflowVpcPerformed,
            attributes: ['id'],
            required: false,
            include: [
              {
                model: this.workflowPerformed,
                where: {
                  concluded: false
                },
                attributes: ['id', 'concluded'],
                required: true
              }
            ]
          }
        ]
      })
      if (!vpc) throw new BadRequestException('VPC não encontrado')
      const workflowInProgress = vpc.vpcPerformeds.find(
        (performedAssociation) =>
          performedAssociation.workflowPerformed.concluded
      )
      if (workflowInProgress)
        throw new BadRequestException(
          'O VPC selecionado possui um fluxo de trabalho em execução'
        )
      const {
        requests,
        products,
        linesFamilies,
        attachments,
        nds,
        ...updateData
      } = data
      await vpc.update({ ...updateData, updatedBy: userId }, { transaction })

      const lineFamiliesToCreate = linesFamilies.filter(
        (lineFamily) => !lineFamily.id
      )

      const linesFamiliesToUpdate = linesFamilies.filter(
        (lineFamily) => lineFamily.id
      )

      const linesFamiliesToDelete = vpc.linesFamilies
        .filter(
          (vpcLineFamily) =>
            !linesFamilies.find(
              (lineFamily) => lineFamily.id === vpcLineFamily.id
            )
        )
        .map((lineFamily) => lineFamily.id)

      if (lineFamiliesToCreate[0])
        await this.multipleCreateInVpc(
          this.workflowVpcLineFamily,
          workflowVpcId,
          lineFamiliesToCreate,
          transaction
        )

      if (linesFamiliesToUpdate[0])
        await this.multipleUpdate(
          this.workflowVpcLineFamily,
          linesFamiliesToUpdate,
          transaction
        )

      if (linesFamiliesToDelete[0])
        this.multipleDelete(
          this.workflowVpcLineFamily,
          linesFamiliesToDelete,
          transaction
        )

      const ndsToCreate = nds.filter((nd) => !nd.id)
      const ndsToUpdate = nds.filter((nd) => nd.id)
      const ndsToDelete = vpc.nds
        .filter((vpcNd) => !nds.find((nd) => nd.id === vpcNd.id))
        .map((nd) => nd.id)
      if (ndsToCreate[0])
        await this.multipleCreateInVpc(
          this.workflowVpcNd,
          workflowVpcId,
          ndsToCreate,
          transaction
        )
      if (ndsToUpdate[0])
        await this.multipleUpdate(this.workflowVpcNd, ndsToUpdate, transaction)
      if (ndsToDelete[0])
        await this.multipleDelete(this.workflowVpcNd, ndsToDelete, transaction)

      const requestsToCreate = requests.filter((request) => !request.id)
      const requestsToUpdate = requests.filter((request) => request.id)
      const requestsToDelete = vpc.requests
        .filter(
          (vpcRequest) =>
            !requests.find((request) => request.id === vpcRequest.id)
        )
        .map((request) => request.id)
      if (requestsToCreate[0])
        await this.multipleCreateInVpc(
          this.workflowVpcRequest,
          workflowVpcId,
          requestsToCreate,
          transaction
        )
      if (requestsToUpdate[0])
        await this.multipleUpdate(
          this.workflowVpcRequest,
          requestsToUpdate,
          transaction
        )
      if (requestsToDelete[0])
        await this.multipleDelete(
          this.workflowVpcRequest,
          requestsToDelete,
          transaction
        )

      const productsToCreate = products.filter((product) => !product.id)
      const productsToUpdate = products.filter((product) => product.id)
      const productsToDelete = vpc.products
        .filter(
          (vpcProduct) =>
            !products.find((product) => vpcProduct.id === product.id)
        )
        .map((product) => product.id)
      if (productsToCreate[0])
        await this.multipleCreateInVpc(
          this.workflowVpcProduct,
          workflowVpcId,
          productsToCreate,
          transaction
        )
      if (productsToUpdate[0])
        await this.multipleUpdate(
          this.workflowVpcProduct,
          productsToUpdate,
          transaction
        )
      if (productsToDelete[0])
        await this.multipleDelete(
          this.workflowVpcProduct,
          productsToDelete,
          transaction
        )

      const attachmentsToCreate = attachments.filter(
        (attachment) => !attachment.id
      )
      const attachmentsToUpdate = attachments.filter((attachment) =>
        vpc.attachments.find(
          (attachmentRelation) => attachment.id === attachmentRelation.id
        )
      )
      const attachmentsToDelete = vpc.attachments.filter(
        (attachmentRelation) =>
          !attachments.find(
            (attachment) => attachment.id === attachmentRelation.id
          )
      )
      if (attachmentsToDelete)
        await this.multipleDeleteDocuments(
          attachmentsToDelete,
          userId,
          transaction
        )
      if (attachmentsToUpdate)
        await this.multipleUpdate(
          this.workflowVpcAttachment,
          attachmentsToUpdate,
          transaction
        )
      if (attachmentsToCreate)
        await this.multipleCreateInVpc(
          this.workflowVpcAttachment,
          workflowVpcId,
          attachmentsToCreate,
          transaction
        )
      if (!trx) await transaction.commit()
      return vpc.id
    } catch (err) {
      if (!trx) await transaction.rollback()
      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o registro de VPC'
      )
    }
  }

  async validateFieldsVpc(vpcId: number): Promise<boolean> {
    const vpc = await this.workflowVpc.findByPk(vpcId, {
      include: [
        {
          model: this.workflowVpcLineFamily
        },
        {
          model: this.workflowVpcNd
        },
        {
          model: this.workflowVpcRequest
        },
        {
          model: this.workflowVpcProduct
        },
        {
          model: this.workflowVpcAttachment
        }
      ]
    })
    if (!vpc)
      throw new BadRequestException(
        'O VPC informado não está com dados completos ou não foi encontrado'
      )

    const notIn: string[] = []

    requiredFieldsVpc.forEach((value: keyof WorkflowVpc) => {
      if (!vpc.getDataValue(value)) notIn.push(value)
    })

    if (notIn[0])
      throw new BadRequestException(
        `Os campos [${ notIn.join(', ') }] são obrigatórios`
      )

    return true
  }

  async startWorkflow(vpcId: number, userId: number): Promise<number> {
    const transaction = await this.db.transaction()

    try {
      await this.validateFieldsVpc(vpcId)

      const { parentCompanyCode, parentCompanyName, approverCode } =
        await this.workflowVpc.findByPk(vpcId, {
          attributes: [
            'id',
            'parentCompanyCode',
            'parentCompanyName',
            'approverCode'
          ]
        })

      const workflowInProgress = await this.findWorkflowInProgress(
        parentCompanyCode
      )

      if (workflowInProgress)
        throw new BadRequestException(
          `O cliente ${ parentCompanyName } já possui um fluxo de trabalho de VPC em andamento`
        )

      const workflowPerformedId =
        await this.workflowPerformedService.startWorkflow(
          WorkflowTypeEnum.VPC,
          userId,
          transaction,
          vpcId,
          parentCompanyCode,
          approverCode
        )

      const statusId = await this.getIdVpcStatus(
        StatusEnum.TAREFA_CADASTRADA_WORKFLOW,
        transaction
      )

      await this.workflowVpc.update(
        {
          workflowPerformedId,
          statusId
        },
        {
          where: {
            id: vpcId
          },
          transaction
        }
      )

      await this.workflowVpcPerformed.create(
        {
          workflowVpcId: vpcId,
          workflowPerformedId
        },
        { transaction }
      )

      await transaction.commit()

      return workflowPerformedId
    } catch (err) {
      await transaction.rollback()

      if (err instanceof HttpException) throw err

      throw new InternalServerErrorException(
        'Ocorreu um erro ao iniciar o fluxo de trabalho de VPC'
      )
    }
  }

  async findWorkflowInProgress(
    parentCompanyCode: number
  ): Promise<WorkflowVpc> {
    return this.workflowVpc.findOne({
      attributes: ['id', 'workflowPerformedId'],
      where: {
        parentCompanyCode
      },
      include: [
        {
          model: this.workflowPerformed,
          attributes: ['id'],
          where: {
            concluded: false
          }
        }
      ]
    })
  }

  /**
   * Busca os workflows executados e em execução de um VPC
   * @param id number
   */
  async findWorkflowsVpcHistory(
    id: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    try {
      const workflowsPerformedHistoryQuery =
        this.workflowPerformedService.findWorkflowsHistoryQuery()

      const workflowVpc = await this.workflowVpc.findByPk(id, {
        include: [
          {
            model: WorkflowVpcPerformed,
            ...workflowsPerformedHistoryQuery
          }
        ],
        attributes: ['id']
      })

      return workflowVpc.vpcPerformeds.map((vpc) =>
        this.workflowPerformedService.formatWorkflowToHistory(
          vpc.workflowPerformed
        )
      )
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscar o histórico do fluxo de trabalho de um VPC'
      )
    }
  }

  /**
   * Busca o histórico de execução de um workflow de VPC
   * @param id number
   * @param workflowPerformedId number
   */
  async findVpcWorkflowPerformedHistory(
    id: number,
    workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    try {
      const workflowsPerformedHistoryQuery =
        this.workflowPerformedService.findWorkflowsPerformedHistoryQuery(
          workflowPerformedId
        )

      const workflowVpc = await this.workflowVpc.findOne({
        where: { id },
        include: [
          {
            required: true,
            where: { workflowPerformedId },
            model: WorkflowVpcPerformed,
            ...workflowsPerformedHistoryQuery
          }
        ],
        attributes: ['id']
      })

      if (!workflowVpc)
        throw new BadRequestException(
          'Histórico do fluxo de trabalho de VPC não encontrado'
        )

      return this.workflowPerformedService.formatWorkflowToPerformedHistory(
        workflowVpc.vpcPerformeds[0].workflowPerformed
      )
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar histórico do fluxo de trabalho de VPC'
      )
    }
  }

  /**
   * Busca por ID um workflow de VPC em andamento
   * @param id number
   */
  async findWorkflowVpcInProgressById(id: number): Promise<WorkflowVpc> {
    return this.workflowVpc.findOne({
      attributes: [
        'id',
        'workflowPerformedId',
        'approverCode',
        'parentCompanyCode'
      ],
      where: { id },
      include: [
        {
          model: this.workflowPerformed,
          attributes: ['id'],
          where: {
            concluded: false
          }
        },
        {
          model: WorkflowVpcLineFamily
        }
      ]
    })
  }

  /**
   * Avança uma etapa no workflow de update de VPC e retorna se o workflow foi finalizado
   * @param workflowVpcId number
   * @param userId number
   * @param data WorkflowPerformedResponseDto
   * @param transaction Transaction
   */
  async advanceVpcWorkflow(
    workflowVpcId: number,
    userId: number,
    data: WorkflowPerformedResponseDto,
    transaction: Transaction
  ): Promise<void> {
    const workflowInProgress = await this.findWorkflowVpcInProgressById(
      workflowVpcId
    )

    if (!workflowInProgress)
      throw new BadRequestException(
        'Não há um fluxo de trabalho em andamento para este VPC'
      )

    const approverFilterDto: ApproverFilterDto = {
      clientCode: workflowInProgress.parentCompanyCode,
      memberCode: workflowInProgress.approverCode
    }

    const { finished, finishedWithSuccess } =
      await this.workflowPerformedService.advanceWorkflow(
        workflowInProgress.workflowPerformed.id,
        userId,
        data,
        transaction,
        approverFilterDto
      )

    if (finished && finishedWithSuccess) await this.integrate()
  }

  integrate(): Promise<void> {
    throw new NotImplementedException('Integração não implementada')
  }
}
