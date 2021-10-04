import {
  HttpException,
  HttpService,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as qs from 'qs'
import { Sequelize, QueryTypes } from 'sequelize'

import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { Address } from '../address/entities/address.entity'
import { File } from '../files/entities/file.entity'
import { WorkflowPerformedHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { WorkflowPerformedService } from '../workflowsPerformed/workflowPerformed.service'
import { RepresentativeBankData } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeBankData.entity'
import { RepresentativeCommissionPercentage } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeCommissionPercentage.entity'
import { RepresentativeDocument } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeDocument.entity'
import { RepresentativeFinancial } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeFinancial.entity'
import { RepresentativeMaintenance } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeMaintenance.entity'
import { WorkflowRepresentativeRegistration } from '../workflowsPerformedTypes/representativeRegistration/entities/workflowRepresentativeRegistration.entity'
import { RepresentativeRegistrationService } from '../workflowsPerformedTypes/representativeRegistration/representativeRegistration.service'
import { FindAllRepresentativesRegistrationReturnDto } from './dtos/find/findAllRepresentativeRegistrationReturn.dto'
import { FindAllRepresentativesRegistrationsDto } from './dtos/find/findAllRepresentativesRegistrations.dto'
import { FindOneRepresentativeRegistrationDto } from './dtos/find/findOneRepresentativeRegistration.dto'
import { ConcludeRepresentativePreRegistrationDto } from './dtos/preRegistration/concludeRepresentativePreRegistration.dto'
import { SaveRepresentativePreRegistrationDto } from './dtos/preRegistration/saveRepresentativePreRegistration.dto'
import { UpdateRepresentativePreRegistrationDto } from './dtos/preRegistration/updateRepresentativePreRegistration.dto'
import { RepresentativeDto } from './dtos/representative.dto'
import { RepresentativeResponseDto } from './dtos/representativeResponse.dto'
import { RepresentativeQueryStringDto } from './dtos/representativesQueryString'
import { RepresentativesResponseDto } from './dtos/representativesResponse.dto'
import { StatusEnum, StatusTranslateEnum } from './enum/status.enum'

@Injectable()
export class RepresentativesService {
  private readonly representativeUrl: string

  constructor(
    private httpService: HttpService,
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(WorkflowPerformedService)
    private workflowPerformedService: WorkflowPerformedService,
    @Inject(RepresentativeRegistrationService)
    private readonly representativeRegistrationService: RepresentativeRegistrationService,
    @InjectModel(WorkflowRepresentativeRegistration)
    private readonly workflowRepresentativeRegistrationModel: typeof WorkflowRepresentativeRegistration
  ) {
    this.representativeUrl = process.env.BRITANIA_REPRESENTANTE_URL
  }

  /**
   * Busca todos representantes
   * @param query RepresentativeQueryStringDto
   * @param authToken string
   */
  async findAll(
    query: RepresentativeQueryStringDto,
    authToken: string
  ): Promise<RepresentativeDto[]> {
    const headers = { Authorization: `Bearer ${ authToken }` }
    const {
      page,
      pageSize,
      name: nomeRepresentante
    } = query
    const queryString = qs.stringify({
      page,
      pageSize,
      nomeRepresentante
    })

    try {
      const { data } = await this.httpService
        .get<RepresentativesResponseDto>(
          `${ this.representativeUrl }/api/v1/Representante?${ queryString }`,
          { headers }
        )
        .toPromise()
      return data.representantes.map(
        ({ codigorepresentante: code, nomerepresentante: name }) =>
          ({ code, name } as RepresentativeDto)
      )
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de representantes'
      )
    }
  }

  /**
   * Busca pré-cadastro de representante por id
   * @param id number
   */
  async findRepresentativePreRegistrationByCode(
    id: number,
    userId: number
  ): Promise<FindOneRepresentativeRegistrationDto> {
    const representative =
      await this.workflowRepresentativeRegistrationModel.findByPk(id, {
        include: [
          { model: Address },
          { model: RepresentativeBankData },
          { model: RepresentativeFinancial },
          { model: RepresentativeMaintenance },
          {
            model: RepresentativeDocument,
            include: [{ model: File }]
          },
          { model: RepresentativeCommissionPercentage }
        ]
      })
    const workflowInProgress =
      await this.representativeRegistrationService.findWorkflowInProgress(id)
    const workflowTaskInProgress = workflowInProgress
      ? await this.workflowPerformedService.findWorkflowTaskInProgress(
          representative.workflowPerformedId,
          userId,
          true
        )
      : null
    return {
      ...(representative.toJSON() as WorkflowRepresentativeRegistration),
      workflowTaskInProgress
    }
  }

  /**
   * Atualiza um Pré-Cadastro de Representante
   * @param id number
   * @param userId number
   * @param data UpdateRepresentativePreRegistrationDto
   */
  async updateRepresentativePreRegistration(
    id: number,
    userId: number,
    data: UpdateRepresentativePreRegistrationDto
  ): Promise<void> {
    try {
      return this.representativeRegistrationService.update(id, userId, data)
    } catch (error) {
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o pré-cadastro de representante'
      )
    }
  }

  /**
   * Busca representante por código
   * @param code number
   * @param authToken string
   */
  async findByCode(
    code: number,
    authToken: string
  ): Promise<RepresentativeDto> {
    const headers = { Authorization: `Bearer ${ authToken }` }

    try {
      const { data } = await this.httpService
        .get<RepresentativeResponseDto>(
          `${ this.representativeUrl }/api/v1/Representante/${ code }`,
          { headers }
        )
        .toPromise()

      return {
        code: data.codigoRepresentante,
        name: data.nomeRepresentante
      } as RepresentativeDto
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de detalhes de representante'
      )
    }
  }

  /**
   * Inicia o processo de Pré-Cadastro de Representante salvando PARCIALMENTE
   * @param data SaveRepresentativePreRegistrationDto
   * @param userId number
   */
  async savePreRegistration(
    data: SaveRepresentativePreRegistrationDto,
    userId: number
  ): Promise<void> {
    try {
      await this.representativeRegistrationService.save(userId, data)
    } catch (error) {
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao salvar o pré-cadastro de representante'
      )
    }
  }

  /**
   * Inicia o processo de Pré-Cadastro de Representante
   * @param data ConcludeRepresentativePreRegistrationDto
   * @param userId number
   */
  async concludePreRegistration(
    data: ConcludeRepresentativePreRegistrationDto,
    userId: number
  ): Promise<void> {
    try {
      await this.representativeRegistrationService.startWorkflow(userId, data)
    } catch (error) {
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao concluir o pré-cadastro de representante'
      )
    }
  }

  /**
    Retorna a condicional where formatada, caso exista alguma condição
    @param query: FindAllRepresentativesRegistrationsDto
  */
  findAllRepresentativeWhere(
    query: FindAllRepresentativesRegistrationsDto
  ): string {
    const whereOptions = []
    if (query.cnpj) whereOptions.push(`cnpj LIKE '%${ query.cnpj }%'`)
    if (query.companyName)
      whereOptions.push(`companyName LIKE '%${ query.companyName }%'`)
    if (query.status) {
      if (query.status !== StatusEnum.WORK_IN_PROGRESS) {
        whereOptions.push(`status = '${ query.status }'`)
      } else {
        whereOptions.push('status NOT IN (\'OPEN\', \'CONCLUDED\', \'CANCELED\')')
      }
    }
    return `${
      whereOptions.length ? `WHERE ${ whereOptions.join(' AND ') } ` : ' '
    } `
  }

  /**
   * Lista com filtros para pré cadastro de representantes
   * @param query FindAllRepresentativesRegistrationsDto
   * @returns PagedResult<WorkflowRepresentativeRegistration>
   */
  async findAllRepresentativesRegistrations(
    query: FindAllRepresentativesRegistrationsDto
  ): Promise<PagedResult<FindAllRepresentativesRegistrationReturnDto>> {
    const result: PagedResult<FindAllRepresentativesRegistrationReturnDto> = {
      totalRegisters: 0,
      data: []
    }
    const { totalRegisters } = await this.db.query<{ totalRegisters: number }>(
      `SELECT COUNT(*) as totalRegisters FROM [vw_representative_pre_registration_list] ${ this.findAllRepresentativeWhere(
        query
      ) }`,
      {
        type: QueryTypes.SELECT,
        plain: true
      }
    )
    const representatives =
      await this.db.query<FindAllRepresentativesRegistrationReturnDto>(
        `SELECT * FROM [vw_representative_pre_registration_list] ${ this.findAllRepresentativeWhere(
          query
        ) } ORDER BY ${ query.orderBy || 'id' } ${ query.sort || 'ASC' } OFFSET ${
          (query.page - 1) * query.pageSize
        } ROWS FETCH NEXT ${ query.pageSize } ROWS ONLY `,
        {
          type: QueryTypes.SELECT,
          raw: true
        }
      )
    result.totalRegisters = totalRegisters
    result.data = representatives.map((representative) => ({
      id: representative.id,
      companyName: representative.companyName,
      cnpj: representative.cnpj,
      commercialPhone: representative.commercialPhone,
      email: representative.email,
      shortName: representative.shortName,
      status:
        representative.status === StatusEnum[representative.status]
          ? StatusTranslateEnum[representative.status]
          : representative.workflowTaskTitle
    }))
    return result
  }

  /**
    Invoca o método de avanço de etapa no workflow de representante
    @param workflowRepresentativeId: number
    @param data: WorkflowPerformedResponseDto
    @param userId: number
    @param transaction: Transaction
  */
  async advanceRepresentativeWorkflow(
    workflowRepresentativeId: number,
    data: WorkflowPerformedResponseDto,
    userId: number
  ): Promise<void> {
    const transaction = await this.db.transaction()
    try {
      await this.representativeRegistrationService.advanceRepresentativeWorkflow(
        workflowRepresentativeId,
        data,
        userId,
        transaction
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error
      throw new InternalServerErrorException(
        'Ocorreu um erro ao avançar fluxo de trabalho do pré-cadastro de representante'
      )
    }
  }

  /**
   * Invoca o método para buscar o histórico de workflows
   * do representante
   * @param representativeId number
   * */
  findRepresentativeWorkflowHistory(
    representativeId: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    return this.representativeRegistrationService.findWorkflowsHistory(
      representativeId
    )
  }

  /**
   * Invoca o método para buscar o
   * histórico de tarefas da execução de um workflow de representante
   * @param representativeId number
   * @param workflowPerformedId number
   * */
  findRepresentativeWorkflowPerformedHistory(
    representativeId: number,
    workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    return this.representativeRegistrationService.findWorkflowPerformedHistory(
      representativeId,
      workflowPerformedId
    )
  }
}
