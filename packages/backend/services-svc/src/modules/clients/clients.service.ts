import {
  Injectable,
  HttpService,
  UnauthorizedException,
  InternalServerErrorException,
  Inject,
  HttpException,
  BadRequestException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as qs from 'qs'
import { Sequelize, literal, Transaction } from 'sequelize'

import { isEmpty } from 'lodash'

import { PagedResult } from '../../utils/pagination/pagedResult.dto'
import { ClientRankingsService } from '../clientRankings/clientRankings.service'
import { ChangeClientRankingDto } from '../clientRankings/dto/changeRequest/changeClientRanking.dto'
import { IndicatorValuesDto } from '../clientRankings/dto/findAll/indicatorValues.dto'
import { RankingsDto } from '../clientRankings/dto/findAll/rankings.dto'
import { ClientRanking } from '../clientRankings/entities/clientRanking.entity'
import { ClientRankingIndicator } from '../clientRankings/entities/clientRankingIndicator.entity'
import { Ranking } from '../clientRankings/entities/ranking.entity'
import { IndicatorsEnum } from '../clientRankings/enum/indicators.enum'
import { RankingsEnum } from '../clientRankings/enum/rankings.enum'
import { ClientRegionalManagerDto } from '../hierarchy/dtos/clientRegionalManager.dto'
import { GetClientHierarchyRepresentativesQueryDto } from '../hierarchy/dtos/getRegionalClientQuery.dto'
import { HierarchyService } from '../hierarchy/hierarchy.service'
import { WorkflowPerformedHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedHistory.dto'
import { WorkflowPerformedResponseDto } from '../workflowsPerformed/dtos/workflowPerformedResponse.dto'
import { WorkflowPerformedResponseHistoryDto } from '../workflowsPerformed/dtos/workflowPerformedResponseHistory.dto'
import { WorkflowPerformedService } from '../workflowsPerformed/workflowPerformed.service'
import { WorkflowClientRankingService } from '../workflowsPerformedTypes/clientRankings/clientRankings.service'
import { WorkflowClientRanking } from '../workflowsPerformedTypes/clientRankings/entities/workflowClientRanking.entity'
import { WorkflowClientRegisterService } from '../workflowsPerformedTypes/clientRegister/clientRegister.service'
import { CreateClientRegisterDto } from '../workflowsPerformedTypes/clientRegister/dto/create/createClientRegister.dto'
import { FindDetailsClientRegisterDto } from '../workflowsPerformedTypes/clientRegister/dto/find/findDetailsClientRegister.dto'
import { WorkflowClientUpdateService } from '../workflowsPerformedTypes/clientUpdate/clientUpdate.service'
import { WorkflowClientUpdate } from '../workflowsPerformedTypes/clientUpdate/entities/workflowClientUpdate.entity'
import { ClientGroupsDto } from './dto/clientGroups.dto'
import { ClientGroupsQueryDto } from './dto/clientGroupsQuery.dto'
import { ClientGroupsResponseDto } from './dto/clientGroupsResponse.dto'
import { ContractualPercentageResponseDto } from './dto/contractualPercentageResponse.dto'
import { ClientQueryDto } from './dto/findAll/clientQuery.dto'
import { ClientQueryDescriptionDto } from './dto/findAll/clientQueryDescription.dto'
import { ParentCompanyDto } from './dto/findAll/listClient.dto'
import { ListClientDescriptionDto } from './dto/findAll/listClientDescription.dto'
import { FindBranchesDto } from './dto/findBranches/findBranches.dto'
import { FindBranchesQueryDto } from './dto/findBranches/findBranchesQuery.dto'
import { ClientRankingDetailsDto } from './dto/findDetails/clientRankingDetails.dto'
import { FindDetailsDto } from './dto/findDetails/findDetails.dto'
import { FindDetailsResponseDto } from './dto/findDetailsResponseDto/findDetailsResponse.dto'
import { GetClientsQueryDto } from './dto/getClients/getClientsQuery.dto'
import { GetClientsResponseDto } from './dto/getClients/getClientsResponse.dto'
import { OperationNatureQueryDto } from './dto/operationNatureQuery.dto'
import { OperationNatureResponseDto } from './dto/operationNatureResponse.dto'
import { OperationNatureReturnDto } from './dto/operationNatureReturn.dto'
import { PriceListQueryDto } from './dto/priceListQuery.dto'
import { PriceListResponseDto } from './dto/priceListResponse.dto'
import { PriceListReturnDto } from './dto/priceListReturn.dto'
import { UpdateClientDto } from './dto/update/updateClient.dto'
import { BranchesOrderByValueEnum } from './enum/branchesOrderby.enum'
import { ClientCategoryEnum } from './enum/clientCategory.enum'
import { ClientOrderByValueEnum } from './enum/clientOrderBy.enum'
import { ClientRegistrationStatusEnum } from './enum/clientRegistrationStatus.enum'
import { ClientRegistrationTypeEnum } from './enum/clientRegistrationType.enum'
import { ClientStatusEnum } from './enum/clientStatus.enum'
import { CreditSituationValue } from './enum/creditSituation.enum'
import { RegimeLetterValueEnum } from './enum/regimeLetter.enum'

@Injectable()
export class ClientsService {
  private readonly clientsUrl: string

  private readonly priceListUrl: string

  private readonly operationNatureUrl: string

  private readonly budgetContractUrl: string

  constructor(
    private httpService: HttpService,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(ClientRanking)
    private readonly clientRankingModel: typeof ClientRanking,
    @InjectModel(ClientRankingIndicator)
    private clientRankingIndicatorModel: typeof ClientRankingIndicator,
    @Inject(ClientRankingsService)
    private clientRankingsService: ClientRankingsService,
    @Inject(WorkflowClientUpdateService)
    private readonly workflowClientUpdateService: WorkflowClientUpdateService,
    @Inject(WorkflowClientRegisterService)
    private workflowClientRegisterService: WorkflowClientRegisterService,
    @Inject(WorkflowClientRankingService)
    private workflowClientRankingService: WorkflowClientRankingService,
    @Inject(WorkflowPerformedService)
    private workflowPerformedService: WorkflowPerformedService,
    @Inject(HierarchyService)
    private hierarchyService: HierarchyService
  ) {
    this.clientsUrl = process.env.BRITANIA_CLIENTE_URL
    this.priceListUrl = process.env.BRITANIA_TABELA_PRECO_URL
    this.operationNatureUrl = process.env.BRITANIA_NATUREZA_OPERACAO_URL
    this.budgetContractUrl = process.env.BRITANIA_CONTRATO_VERBA_URL
  }

  /**
   * Busca todos os grupos de clientes
   * @param query ClientGroupsQuery
   * @param authToken string
   */
  async getGroups(
    query: ClientGroupsQueryDto,
    authToken: string
  ): Promise<ClientGroupsDto[]> {
    try {
      const formattedQuery = {
        ...query,
        nomeGrupoCliente: query.nameClientGroup,
        codigoGrupoCliente: query.codeClientGroup
      }
      const { data } = await this.httpService
        .get<ClientGroupsResponseDto>(
          `${ this.clientsUrl }/api/v1/GrupoCliente?${ qs.stringify(
            formattedQuery
          ) }`,
          { headers: { Authorization: `Bearer ${ authToken }` } }
        )
        .toPromise()
      return data.gruposCliente.map((value) => ({
        codeClientGroup: value.codigogrupocliente,
        nameClientGroup: value.nomegrupocliente
      }))
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de grupo de clientes'
      )
    }
  }

  /**
   * Retorna um ARRAY seguindo o ENUM [A, B, C]
   */
  getClientCategory(): string[] {
    return Object.keys(ClientCategoryEnum)
  }

  /**
   * Retorna informações de um cliente específico
   * @param id number
   * @param authToken string
   * @returns
   */
  async findClientDetails(
    id: number,
    tokenBritania: string
  ): Promise<FindDetailsResponseDto> {
    try {
      const { data } = await this.httpService
        .get<FindDetailsResponseDto>(
          `${ this.clientsUrl }/api/v1/Cliente/${ id }`,
          { headers: { Authorization: `Bearer ${ tokenBritania }` } }
        )
        .toPromise()

      return data
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()
      if (error?.response?.status === 404) return undefined

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de detalhes de cliente'
      )
    }
  }

  /**
   * Retorna informações de um cliente específico
   * @param clientTotvsCode number
   * @param authToken string
   * @returns
   */
  async findDetails(
    clientTotvsCode: number,
    userId: number,
    tokenBritania: string
  ): Promise<FindDetailsDto> {
    try {
      const workflowInProgress =
        await this.workflowClientUpdateService.findWorkflowInProgress(
          clientTotvsCode
        )

      const contractPercentages = await this.findClientContractualPercentage(
        clientTotvsCode.toString(),
        tokenBritania
      )

      const workflowTaskInProgress = workflowInProgress
        ? await this.workflowPerformedService.findWorkflowTaskInProgress(
            workflowInProgress.workflowPerformedId,
            userId,
            true
          )
        : null

      const rankingDetails = await this.findClientRankingDetails(
        clientTotvsCode,
        userId
      )

      const registeredDetails = await this.getClientRegisterDetails(
        clientTotvsCode,
        tokenBritania
      )

      const details = workflowInProgress
        ? await this.getClientUpdateDetails(
            workflowInProgress.id,
            registeredDetails
          )
        : registeredDetails

      return {
        ...details,
        mainData: {
          ...details.mainData,
          customerRanking: rankingDetails?.currentRanking?.description
        },
        contractPercentage: contractPercentages.map((contract) => ({
          percentual: contract.percentualContrato,
          number: contract.codigoContratoVerba,
          name: contract.nomeContratoVerba,
          line: contract.nomeLinha,
          lineCode: contract.codigoLinha,
          family: null,
          familyCode: null,
          startDate: contract.dataInicioValidade,
          endDate: contract.dataFimValidade,
          status: null,
          periodicity: contract.periodicidade
        })),
        workflowTaskInProgress,
        rankingDetails
      } as FindDetailsDto
    } catch (error) {
      if (error instanceof HttpException) throw error
      throw new InternalServerErrorException()
    }
  }

  /**
   * Busca os detalhes de um cliente cadastrado
   * @param clientTotvsCode number
   * @param tokenBritania string
   * @returns Promise<FindDetailsDto>
   */
  async getClientRegisterDetails(
    clientTotvsCode: number,
    tokenBritania: string
  ): Promise<FindDetailsDto> {
    const data = await this.findClientDetails(clientTotvsCode, tokenBritania)

    const formattedDetails: FindDetailsDto = {
      mainData: {
        parentCompanyCode: data.codigoMatriz,
        parentCompanyName: data.nomeMatriz,
        clientTotvsCode: data.codigoCliente,
        cnpj: data.cnpj,
        socialReason: data.razaoSocial,
        branches: !data.isMatriz ? data.nomeCliente : null,
        commercialPhone: data.telefone.trim(),
        cellPhone: null,
        logisticsInformation: null,
        creditSituation: this.formatCreditSituation(Number(data.situacaoCredito)),
        regimeLetter: data.cartaRegime,
        daysWithoutBilling: data.diasSemFaturamento,
        status:
          data.diasSemFaturamento <= 90
            ? ClientStatusEnum.ACTIVE
            : ClientStatusEnum.INACTIVE,
        customerRanking: undefined
      },
      deliveryAddress: {
        zipCode: data.enderecoEntrega.cep,
        publicPlace: data.enderecoEntrega.endereco, // Consta número
        number: Number(data.enderecoEntrega.numero),
        district: data.enderecoEntrega.bairro,
        complement: null,
        city: data.enderecoEntrega.cidade,
        state: data.enderecoEntrega.estado,
        country: data.enderecoEntrega.pais,
        phone: null,
        email: data.emailEnvioNotaFiscal
      },
      billingAddress: {
        zipCode: data.enderecoCobranca.cep,
        publicPlace: data.enderecoCobranca.endereco,
        number: Number(data.enderecoCobranca.numero),
        district: data.enderecoCobranca.bairro,
        complement: null,
        city: data.enderecoCobranca.cidade,
        state: data.enderecoCobranca.estado,
        country: data.enderecoCobranca.pais,
        phone: null,
        email: data.emailCobranca
      }
    }

    return formattedDetails
  }

  /**
   * Busca os detalhes de uma atu de cliente
   * @param id number
   * @param registeredDetails FindDetailsDto
   * @returns Promise<FindDetailsDto>
   */
  async getClientUpdateDetails(
    id: number,
    registeredDetails: FindDetailsDto
  ): Promise<FindDetailsDto> {
    const details = (
      await this.workflowClientUpdateService.getById(id)
    ).toJSON() as WorkflowClientUpdate

    return {
      mainData: {
        ...registeredDetails.mainData,
        commercialPhone: details.commercialPhone,
        cellPhone: details.cellPhone,
        logisticsInformation: details.logisticsInformation,
        creditSituation: details.creditSituation,
        regimeLetter: details.regimeLetter,
        daysWithoutBilling: details.daysWithoutBilling,
        customerRanking: undefined,
        status: ClientStatusEnum.WORKFLOW_IN_PROGRESS
      },
      deliveryAddress: {
        zipCode: details.deliveryAddress.zipCode,
        publicPlace: details.deliveryAddress.publicPlace,
        number: details.deliveryAddress.number,
        district: details.deliveryAddress.district,
        complement: details.deliveryAddress.complement,
        city: details.deliveryAddress.city,
        state: details.deliveryAddress.state,
        country: details.deliveryAddress.country,
        phone: details.deliveryAddress.phone,
        email: details.deliveryAddress.email
      },
      billingAddress: {
        zipCode: details.billingAddress.zipCode,
        publicPlace: details.billingAddress.publicPlace,
        number: details.billingAddress.number,
        district: details.billingAddress.district,
        complement: details.billingAddress.complement,
        city: details.billingAddress.city,
        state: details.billingAddress.state,
        country: details.billingAddress.country,
        phone: details.billingAddress.phone,
        email: details.billingAddress.email
      }
    } as FindDetailsDto
  }

  /**
   * Busca os detalhes do ranking de um cliente
   * @param clientTotvsCode number
   * @param userId number
   * @returns  Promise<ClientRankingDetailsDto>
   */
  async findClientRankingDetails(
    clientTotvsCode: number,
    userId: number
  ): Promise<ClientRankingDetailsDto> {
    const [currentRanking, oldRanking] =
      await this.findCurrentAndOldClientRanking(clientTotvsCode)

    const indicators = await this.findLastClientRankingIndicator(
      clientTotvsCode
    )

    const workflowInProgress =
      await this.workflowClientRankingService.findWorkflowInProgress(
        clientTotvsCode
      )

    const workflowTaskInProgress = workflowInProgress
      ? await this.workflowPerformedService.findWorkflowTaskInProgress(
          workflowInProgress.workflowPerformedId,
          userId,
          true
        )
      : null

    return {
      currentRanking: currentRanking?.ranking
        ? {
            alias: currentRanking.ranking.alias,
            description: currentRanking.ranking.description
          }
        : null,
      oldRanking: oldRanking?.ranking
        ? {
            alias: oldRanking.ranking.alias,
            description: oldRanking.ranking.description
          }
        : null,
      indicators: indicators
        ? {
            growth: indicators.growth,
            devolution: indicators.devolution,
            paymentTerms: indicators.paymentTerms,
            productIntroduction: indicators.productIntroduction
          }
        : null,
      workflowInProgress: workflowInProgress
        ? {
            requester:
              workflowInProgress.workflowPerformed.createdByUser.username,
            date: workflowInProgress.workflowPerformed.createdAt,
            requestedRanking: {
              alias: workflowInProgress.ranking.alias,
              description: workflowInProgress.ranking.description
            },
            justification: workflowInProgress.justification
          }
        : null,
      workflowTaskInProgress
    }
  }

  /**
   * Busca o último registro do indicador de ranking do cliente
   * @param clientTotvsCode number
   * @returns ClientRankingIndicator
   */
  async findLastClientRankingIndicator(
    clientTotvsCode: number
  ): Promise<ClientRankingIndicator> {
    return this.clientRankingIndicatorModel.findOne({
      where: {
        clientTotvsCode
      },
      order: [['created_at', 'desc']]
    })
  }

  /**
   * Busca o ranking atual e o anterior de um cliente
   * @param clientTotvsCode number
   */
  findCurrentAndOldClientRanking(
    clientTotvsCode: number
  ): Promise<ClientRanking[]> {
    return this.clientRankingModel.findAll({
      attributes: [['id', 'pk'], 'clientTotvsCode', 'rankingId'],
      where: {
        clientTotvsCode
      },
      limit: 2,
      order: [[literal('\'pk\''), 'DESC']],
      include: [{ model: Ranking }]
    })
  }

  /**
   * Inicia o processo de atualização de cliente
   * @param clientTotvsCode number
   * @param userId number
   * @param data UpdateClientDto
   */
  async update(
    clientTotvsCode: number,
    userId: number,
    tokenBritania: string,
    data: UpdateClientDto
  ): Promise<void> {
    try {
      const client = await this.findClientDetails(
        clientTotvsCode,
        tokenBritania
      )
      if (!client) throw new BadRequestException('Cliente não encontrado')

      await this.workflowClientUpdateService.startWorkflow(
        clientTotvsCode,
        userId,
        data
      )
    } catch (error) {
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o cadastro do cliente'
      )
    }
  }

  /**
   * Busca todas as matrizes
   * @param query ClientQueryDto
   * @param tokenBritania string
   */
  findAllParentCompanies(
    query: ClientQueryDto,
    tokenBritania: string
  ): Promise<PagedResult<ParentCompanyDto>> {
    try {
      return query.clientRegistrationType ===
        ClientRegistrationTypeEnum.REGISTER
        ? this.getRegisteredParentCompanies(query, tokenBritania)
        : this.workflowClientRegisterService.getPreRegistrationParentCompanies(
            query
          )
    } catch (error) {
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao consultar os clientes'
      )
    }
  }

  /**
   * Busca todas as descrições dos clientes
   * seguidos com o cnpj e código
   * @param query findAllParentCompaniesDescriptions
   * @param tokenBritania string
   */
  async findAllParentCompaniesDescriptions(
    query: ClientQueryDescriptionDto,
    tokenBritania: string
  ): Promise<ListClientDescriptionDto[]> {
    const getClientsQuery: GetClientsQueryDto = {
      nomeCliente: query.parentCompany,
      razaoSocial: query.companyName,
      codigoMatriz: query.parentCompanyCode,
      cnpj: query.cnpj,
      q: 'nomecliente,codigocliente,cnpj,razaosocial',
      page: query.page,
      pageSize: query.pageSize
    }

    const { clientes: clients } = await this.getClients(
      getClientsQuery,
      tokenBritania
    )

    return clients.map((client) => ({
      parentCompanyName: client.nomecliente.trim(),
      parentCompanyCode: client.codigocliente,
      cnpj: client.cnpj,
      companyName: client.razaosocial
    }))
  }

  /**
   * Busca o ranking atual dos clientes através do seu código da totvs
   * @param clientCodes number[]
   */
  findCurrentClientRankingByCodes(
    clientCodes: number[]
  ): Promise<ClientRanking[]> {
    return this.clientRankingModel.findAll({
      attributes: ['clientTotvsCode', 'rankingId'],
      where: {
        id: {
          $in: Sequelize.literal(`(
            SELECT MAX(C.id)
            FROM [client_rankings] C
            WHERE client_totvs_code IN (${ clientCodes.join(',') })
            GROUP BY client_totvs_code
          )`)
        }
      },
      include: [{ model: Ranking }]
    })
  }

  /**
   * Busca matrizes na API da DW
   * @param query ClientQueryDto
   * @param tokenBritania string
   */
  async getRegisteredParentCompanies(
    query: ClientQueryDto,
    tokenBritania: string
  ): Promise<PagedResult<ParentCompanyDto>> {
    const result: PagedResult<ParentCompanyDto> = {
      totalRegisters: 0,
      data: []
    }
    let workflowClientCodes: number[] = []

    if (query.workflowTypeId || query.workflowId || query.workflowTaskId) {
      workflowClientCodes = await this.getRegisteredWorkflowClientCodes(
        query.workflowTypeId,
        query.workflowId,
        query.workflowTaskId
      )

      if (
        !workflowClientCodes.length ||
        (query.parentCompanyCode &&
          !workflowClientCodes.includes(Number(query.parentCompanyCode)))
      )
        return result
    }

    const getClientsQuery: GetClientsQueryDto = {
      ativo:
        !query.clientRegistrationStatus ||
        query.clientRegistrationStatus === ClientRegistrationStatusEnum.BOTH
          ? undefined
          : query.clientRegistrationStatus ===
            ClientRegistrationStatusEnum.ACTIVE,
      nomeCliente: query.parentCompany,
      nomeAbreviadoCliente: query.shortName,
      codigoMatriz: query.parentCompanyCode || workflowClientCodes.join(),
      situacaoCredito:
        query.creditSituation && CreditSituationValue[query.creditSituation],
      diasSemFaturamento: query.daysWithoutBilling,
      cnpj: query.cnpj,
      codigoCD: query.cdCode,
      descricaoResponsavel: query.responsibleService,
      codigoRegional: query.regionalManager,
      razaoSocial: query.companyName,
      estado: query.state,
      cidade: query.city,
      categoriaCliente: query.category,
      codigoGrupoCliente: query.clientGroup,
      cartaRegime:
        query.regimeLetter && RegimeLetterValueEnum[query.regimeLetter],
      somenteMatriz: true,
      q: 'nomecliente,codigocliente,situacaocredito,cartaregime,diassemfaturamento,codigocliente,numerofiliais,cnpj,razaosocial',
      sort: this.getRegisteredParentCompaniesOrderBy(query),
      page: query.page,
      pageSize: query.pageSize
    }

    const { clientes: clients, totalRegisters } = await this.getClients(
      getClientsQuery,
      tokenBritania
    )

    const clientCodes = clients.map((client) => client.codigocliente)

    if (isEmpty(clientCodes)) return result

    const rankings = await this.findCurrentClientRankingByCodes(clientCodes)

    const updates =
      await this.workflowClientUpdateService.findClientUpdatesByCodes(
        clientCodes
      )

    result.totalRegisters = totalRegisters
    result.data = clients.map((client) => {
      const ranking = rankings.find(
        (rank) => rank.clientTotvsCode === client.codigocliente
      )?.ranking

      const updateConcluded = updates.find(
        (update) => update.clientTotvsCode === client.codigocliente
      )?.workflowPerformed?.concluded

      return {
        parentCompany: client.nomecliente.trim(),
        parentCompanyCode: client.codigocliente,
        logisticInformation: null,
        creditSituation: this.formatCreditSituation(client.situacaocredito),
        regimeLetter: client.cartaregime,
        daysWithoutBilling: client.diassemfaturamento,
        ranking: ranking
          ? {
              alias: ranking?.alias,
              description: ranking?.description
            }
          : null,
        active: client.diassemfaturamento <= 90,
        branchCount: client.numerofiliais,
        cnpj: client.cnpj,
        businessName: client.razaosocial,
        status: this.formatClientStatus(
          client.diassemfaturamento,
          updateConcluded
        ),
        clientRegistrationType: ClientRegistrationTypeEnum.REGISTER
      }
    })

    return result
  }

  /**
   *
   * @param daysWithoutBilling number
   * @param updateConcluded boolean
   */
  formatClientStatus(
    daysWithoutBilling: number,
    updateConcluded?: boolean
  ): ClientStatusEnum {
    if (updateConcluded === false) return ClientStatusEnum.WORKFLOW_IN_PROGRESS

    return daysWithoutBilling <= 90
      ? ClientStatusEnum.ACTIVE
      : ClientStatusEnum.INACTIVE
  }

  /**
   * Busca os código de clientes dos workflows relacionados à clientes registrados
   * @param workflowTypeId number
   * @param workflowId number
   * @param workflowTaskId number
   * @returns Promise<number[]>
   */
  async getRegisteredWorkflowClientCodes(
    workflowTypeId?: number,
    workflowId?: number,
    workflowTaskId?: number
  ): Promise<number[]> {
    const workflowTasksInProgress =
      await this.workflowPerformedService.getWorkflowTasksInProgress(
        workflowTypeId,
        workflowId,
        workflowTaskId
      )

    const workflowPerformedIds = workflowTasksInProgress.map(
      (workflow) => workflow.workflowPerformedId
    )

    if (!workflowPerformedIds.length) return []

    const updateClientCodes =
      await this.workflowClientUpdateService.getClientCodesByPerformedIds(
        workflowPerformedIds
      )

    const rankingClientCodes =
      await this.workflowClientRankingService.getClientCodesByPerformedIds(
        workflowPerformedIds
      )

    return [...updateClientCodes, ...rankingClientCodes]
  }

  /**
   * Monta a clausula order by da busca por matrizes
   * @param query ClientQueryDto
   * @returns string
   */
  getRegisteredParentCompaniesOrderBy(query: ClientQueryDto): string {
    const strategicClient = query.strategicClient
      ? 'ClienteEstrategico desc,'
      : ''

    const orderBy = query.sort
      ? `${ ClientOrderByValueEnum[query.orderBy] }`
      : 'NomeCliente'

    const orderByDirection = query.sort || 'ASC'

    return `${ strategicClient } ${ orderBy } ${ orderByDirection }`
  }

  /**
   * Faz a busca de clientes na api da DW
   * @param query GetClientsQueryDto
   * @param authToken string
   */
  async getClients(
    query: GetClientsQueryDto,
    authToken: string
  ): Promise<GetClientsResponseDto> {
    try {
      const { data } = await this.httpService
        .get<GetClientsResponseDto>(
          `${ this.clientsUrl }/api/v1/Cliente?${ qs.stringify(query) }`,
          { headers: { Authorization: `Bearer ${ authToken }` } }
        )
        .toPromise()
      return data
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de clientes'
      )
    }
  }

  /**
   * Retorna uma lista de filiais
   * @param query FindBranchesQueryDto
   * @param tokenBritania string
   * @returns Promise<FindBranchesDto[]>
   */
  async findBranches(
    query: FindBranchesQueryDto,
    clientCode: number,
    tokenBritania: string
  ): Promise<PagedResult<FindBranchesDto>> {
    const result: PagedResult<FindBranchesDto> = {
      totalRegisters: 0,
      data: []
    }

    const getBranchesQuery: GetClientsQueryDto = {
      q: 'nomecliente,codigocliente,estado,cidade,codigocd,situacaocredito,diassemfaturamento',
      page: query.page,
      pageSize: query.pageSize,
      somenteMatriz: false,
      codigoMatriz: clientCode.toString(),
      sort:
        query.orderBy &&
        `${ BranchesOrderByValueEnum[query.orderBy] } ${ query.sort ?? 'ASC' }`
    }

    const { clientes: clients, totalRegisters } = await this.getClients(
      getBranchesQuery,
      tokenBritania
    )
    result.totalRegisters = totalRegisters
    result.data = clients.map((branch) => ({
      branchName: branch.nomecliente,
      branchCode: branch.codigocliente,
      state: branch.estado,
      city: branch.cidade,
      cdCode: branch.codigocd,
      creditSituation: this.formatCreditSituation(branch.situacaocredito),
      daysWithoutBilling: branch.diassemfaturamento,
      active: branch.diassemfaturamento <= 90
    }))

    return result
  }

  /**
   * Retorna o nome da situação de crédito
   * @param situationId number
   * @returns string
   */
  formatCreditSituation(situationId: number): string {
    if (situationId === 1) return 'Normal'
    if (situationId === 2) return 'Automático'
    if (situationId === 3) return 'Só implanta pedido'
    if (situationId === 4) return 'Suspenso'
    if (situationId === 5) return 'Pagamento à vista'
    return null
  }

  async createPreRegister(
    data: CreateClientRegisterDto,
    userId: number
  ): Promise<number> {
    return this.workflowClientRegisterService.create(data, userId)
  }

  async updatePreRegister(
    data: CreateClientRegisterDto,
    workflowClientRegisterId: number,
    userId: number
  ): Promise<number> {
    return this.workflowClientRegisterService.update(
      data,
      workflowClientRegisterId,
      userId
    )
  }

  async startWorkflowPreRegister(
    workflowClientRegisterId: number,
    userId: number
  ): Promise<number> {
    return this.workflowClientRegisterService.startWorkflow(
      workflowClientRegisterId,
      userId
    )
  }

  async getPriceList(
    query: PriceListQueryDto,
    authToken: string
  ): Promise<PriceListReturnDto[]> {
    try {
      const params = {
        page: query.page,
        pageSize: query.pageSize,
        nomeTabelaPreco: query.description
      }

      const { data } = await this.httpService
        .get<PriceListResponseDto>(
          `${ this.priceListUrl }/api/v1/TabelaPreco?${ qs.stringify(params) }`,
          {
            headers: { Authorization: `Bearer ${ authToken }` }
          }
        )
        .toPromise()
      return data.tabelaPrecos.map((price) => ({
        codePriceList: price.codigotabelapreco,
        namePriceList: `${
          price.codigotabelapreco
        } - ${ price.nometabelapreco.trim() }`
      }))
    } catch (err) {
      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de tabelas de preço'
      )
    }
  }

  /**
   * Busca o histórico de alterações de ranking de um cliente
   * @param clientTotvsCode number
   */
  async findClientRankingWorkflowHistory(
    clientTotvsCode: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    return this.workflowClientRankingService.findWorkflowsHistory(
      clientTotvsCode
    )
  }

  /**
   * Busca o histórico de tarefas da execução de um workflow de ranking de cliente
   * @param clientTotvsCode number
   * @param workflowPerformedId number
   */
  findClientRankingWorkflowPerformedHistory(
    clientTotvsCode: number,
    workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    return this.workflowClientRankingService.findWorkflowPerformedHistory(
      clientTotvsCode,
      workflowPerformedId
    )
  }

  /**
   * Avança uma etapa no workflow de ranking de cliente
   * @param clientTotvsCode number
   * @param userId number
   * @param data WorkflowPerformedResponseDto
   */
  async advanceClientRankingWorkflow(
    clientTotvsCode: number,
    userId: number,
    data: WorkflowPerformedResponseDto
  ): Promise<void> {
    const transaction = await this.db.transaction()
    try {
      const { finished, finishedWithSuccess, workflow } =
        await this.workflowClientRankingService.advanceWorkflow(
          clientTotvsCode,
          userId,
          data,
          transaction
        )

      if (!finished || !finishedWithSuccess) return transaction.commit()

      await this.updateClientRanking(workflow, transaction)

      return transaction.commit()
    } catch (error) {
      await transaction.rollback()

      if (error instanceof HttpException) throw error
      throw new InternalServerErrorException(
        'Ocorreu um erro ao avançar o fluxo de trabalho de ranking de cliente'
      )
    }
  }

  /**
   * Atualiza o ranking de um cliente
   * @param workflow WorkflowClientRanking
   * @param transaction Transaction
   */
  updateClientRanking(
    workflow: WorkflowClientRanking,
    transaction: Transaction
  ): Promise<ClientRanking> {
    return this.clientRankingModel.create(
      {
        clientTotvsCode: workflow.clientTotvsCode,
        rankingId: workflow.ranking.id,
        workflowClientRankingId: workflow.id,
        clientRankingIndicatorId: workflow.clientRankingIndicatorId
      },
      { transaction }
    )
  }

  /**
   * Busca o ranking sugerido de acordo com os indicadores do cliente
   * @param clientTotvsCode number
   * @param tokenBritania string
   */
  async rankingSuggestion(
    clientTotvsCode: number,
    tokenBritania: string
  ): Promise<Ranking> {
    try {
      const client = await this.findClientDetails(
        clientTotvsCode,
        tokenBritania
      )

      if (!client) throw new BadRequestException('Cliente não encontrado')

      const clientRankingIndicator = await this.findLastClientRankingIndicator(
        clientTotvsCode
      )

      if (!clientRankingIndicator) return null

      const { indicators } = await this.clientRankingsService.findAll()

      const rankingsEnum = Object.keys(RankingsEnum)
      const rankingKeys = Object.keys(indicators).filter((key) =>
        rankingsEnum.includes(key)
      )
      const rankings = rankingKeys.map((key) => indicators[key] as RankingsDto)

      let indicatorsWeight = this.clientRankingsService.calculateRanking(
        clientRankingIndicator.growth,
        IndicatorsEnum.GROWTH,
        rankings
      )
      indicatorsWeight += this.clientRankingsService.calculateRanking(
        clientRankingIndicator.devolution,
        IndicatorsEnum.DEVOLUTION,
        rankings
      )
      indicatorsWeight += this.clientRankingsService.calculateRanking(
        clientRankingIndicator.productIntroduction,
        IndicatorsEnum.PRODUCT_INTRODUCTION,
        rankings
      )
      indicatorsWeight += this.clientRankingsService.calculateRanking(
        clientRankingIndicator.paymentTerms,
        IndicatorsEnum.PAYMENT_TERMS,
        rankings
      )

      const rankingsAverage = Object.keys(RankingsEnum)
        .map((key) => ({
          id: indicators[key].id as number,
          average: Object.keys(IndicatorsEnum).reduce((weight, indicator) => {
            // eslint-disable-next-line no-param-reassign
            weight += (indicators[key][indicator] as IndicatorValuesDto).weight
            return weight
          }, 0)
        }))
        .sort((a, b) => (a.average > b.average ? 1 : -1))

      const rankingId = rankingsAverage.reduce(
        (id, rankingAverage) =>
          indicatorsWeight >= rankingAverage.average ? rankingAverage.id : id,
        0
      )

      return this.clientRankingsService.findRankingById(rankingId)
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao consultar a sugestão de ranking do cliente'
      )
    }
  }

  /**
   * Inicia o processo de atualização de alteração de ranking do cliente
   * @param clientTotvsCode number
   * @param userId number
   * @param data ChangeClientRankingDto
   */
  async changeClientRanking(
    clientTotvsCode: number,
    userId: number,
    tokenBritania: string,
    data: ChangeClientRankingDto
  ): Promise<void> {
    try {
      const client = await this.findClientDetails(
        clientTotvsCode,
        tokenBritania
      )
      if (!client) throw new BadRequestException('Cliente não encontrado')

      const clientRankingIndicator = await this.findLastClientRankingIndicator(
        clientTotvsCode
      )

      await this.workflowClientRankingService.startWorkflow(
        clientTotvsCode,
        userId,
        clientRankingIndicator,
        data
      )
    } catch (error) {
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o ranking do cliente'
      )
    }
  }

  /**
   * Busca o histórico de alterações de update de um cliente
   * @param clientTotvsCode number
   */
  async findClientUpdateWorkflowHistory(
    clientTotvsCode: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    return this.workflowClientUpdateService.findWorkflowsHistory(
      clientTotvsCode
    )
  }

  /**
   * Busca o histórico de tarefas da execução de um workflow de update de cliente
   * @param clientTotvsCode number
   * @param workflowPerformedId number
   */
  findClientUpdateWorkflowPerformedHistory(
    clientTotvsCode: number,
    workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    return this.workflowClientUpdateService.findWorkflowPerformedHistory(
      clientTotvsCode,
      workflowPerformedId
    )
  }

  /**
   * Avança uma etapa no workflow de update de cliente
   * @param clientTotvsCode number
   * @param userId number
   * @param data WorkflowPerformedResponseDto
   */
  async advanceClientUpdateWorkflow(
    clientTotvsCode: number,
    userId: number,
    data: WorkflowPerformedResponseDto
  ): Promise<void> {
    const transaction = await this.db.transaction()
    try {
      await this.workflowClientUpdateService.advanceWorkflow(
        clientTotvsCode,
        userId,
        data,
        transaction
      )

      return transaction.commit()
    } catch (error) {
      await transaction.rollback()

      if (error instanceof HttpException) throw error
      throw new InternalServerErrorException(
        'Ocorreu um erro ao avançar o fluxo de trabalho de atualização de cadastro de cliente'
      )
    }
  }

  /**
   * Irá retornar o pré registro do cliente
   * @param workflowClientRegisterId number
   */
  async getPreRegister(
    workflowClientRegisterId: number,
    userId: number
  ): Promise<FindDetailsClientRegisterDto> {
    return this.workflowClientRegisterService.getPreRegister(
      workflowClientRegisterId,
      userId
    )
  }

  /**
   * Busca as naturezas de operações
   * @param query OperationNatureQueryDto
   * @param tokenBritania string
   */
  async findOperationNature(
    query: OperationNatureQueryDto,
    tokenBritania: string
  ): Promise<OperationNatureReturnDto[]> {
    try {
      const params = {
        page: query.page,
        pageSize: query.pageSize,
        nomeNaturezaOperacao: query.description,
        codigoNaturezaOperacao: query.code
      }

      const { data } = await this.httpService
        .get<OperationNatureResponseDto>(
          `${ this.operationNatureUrl }/api/v1/NaturezaOperacao?${ qs.stringify(
            params
          ) }`,
          {
            headers: { Authorization: `Bearer ${ tokenBritania }` }
          }
        )
        .toPromise()
      return data.naturezaOperacaos.map((operationNature) => ({
        code: operationNature.codigonaturezaoperacao,
        description: `${
          operationNature.codigonaturezaoperacao
        } - ${ operationNature.nomenaturezaoperacao.trim() }`
      }))
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de natureza de operação'
      )
    }
  }

  /**
   * Busca os percentuais de contrato de um cliente
   * @param clientTotvsCode string
   * @param tokenBritania string
   */
  async findClientContractualPercentage(
    clientTotvsCode: string,
    tokenBritania: string
  ): Promise<ContractualPercentageResponseDto[]> {
    try {
      const params = {
        CodigoCliente: clientTotvsCode
      }

      const { data } = await this.httpService
        .get<ContractualPercentageResponseDto[]>(
          `${ this.budgetContractUrl }/api/v1/ContratoVerba?${ qs.stringify(
            params
          ) }`,
          { headers: { Authorization: `Bearer ${ tokenBritania }` } }
        )
        .toPromise()

      return data
    } catch (error) {
      if (error?.response?.status === 401) throw new UnauthorizedException()

      throw new InternalServerErrorException(
        'Ocorreu um erro de comunicação com o serviço de contratos de verba'
      )
    }
  }

  /**
   * Busca os gerentes regionais de um cliente
   * @param query GetClientRegionalManagersQueryDto
   * @param clientCode number
   * @param userId number
   */
  getClientRegionalManagers(
    query: GetClientHierarchyRepresentativesQueryDto,
    clientCode: number,
    userId: number
  ): Promise<ClientRegionalManagerDto[]> {
    return this.hierarchyService.getClientRegionalManagers(
      query,
      clientCode,
      userId
    )
  }

  /**
   * Busca os responsáveis de um cliente
   * @param query GetClientRegionalManagersQueryDto
   * @param clientCode number
   * @param userId number
   */
  getClientResponsible(
    query: GetClientHierarchyRepresentativesQueryDto,
    clientCode: number,
    userId: number
  ): Promise<ClientRegionalManagerDto[]> {
    return this.hierarchyService.getClientResponsible(query, clientCode, userId)
  }

  /**
   * Invoca o método para
   * buscar o histórico de workflows do registro do cliente
   * @param workflowClientRegisterId number
   */
  findClientRegisterWorkflowHistory(
    workflowClientRegisterId: number
  ): Promise<WorkflowPerformedHistoryDto[]> {
    return this.workflowClientRegisterService.findWorkflowHistory(
      workflowClientRegisterId
    )
  }

  /**
   * invoca o método para buscar
   * o histórico de tarefas da execução de um workflow do registro do cliente
   * @param workflowClientRegisterId number
   * @param workflowPerformedId number
   */
  findClientRegisterPerformedWorkflowHistory(
    workflowClientRegisterId: number,
    workflowPerformedId: number
  ): Promise<WorkflowPerformedResponseHistoryDto[]> {
    return this.workflowClientRegisterService.findPerformedWorkflowHistory(
      workflowClientRegisterId,
      workflowPerformedId
    )
  }

  /**
   * Invoca o método para avançar uma etapa no workflow de ranking de cliente
   * @param workflowClientRegisterId number
   * @param userId number
   * @param data WorkflowPerformedResponseDto
   */
  async advanceClientRegisterWorkflow(
    workflowClientRegisterId: number,
    userId: number,
    data: WorkflowPerformedResponseDto
  ): Promise<void> {
    const transaction = await this.db.transaction()
    try {
      await this.workflowClientRegisterService.advanceWorkflow(
        workflowClientRegisterId,
        userId,
        data,
        transaction
      )
      return transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Erro ao avançar o fluxo de trabalho de pré-cadastro de cliente'
      )
    }
  }
}
