import { HttpModule, HttpService, InternalServerErrorException, Provider, UnauthorizedException } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'
import { of, throwError } from 'rxjs'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { OkResponse, UnauthorizedResponse, InternalServerErrorResponse } from '../../utils/mocks/AxiosResponses'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { ClientRankingsService } from '../clientRankings/clientRankings.service'
import { ClientRanking } from '../clientRankings/entities/clientRanking.entity'
import { ClientRankingIndicator } from '../clientRankings/entities/clientRankingIndicator.entity'
import { Ranking } from '../clientRankings/entities/ranking.entity'
import { RankingIndicatorValue } from '../clientRankings/entities/rankingIndicatorValue.entity'
import { File } from '../files/entities/file.entity'
import { FilesService } from '../files/files.service'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { HierarchyService } from '../hierarchy/hierarchy.service'
import { UserRepresentativeCode } from '../users/entities/userRepresentativeCode.entity'
import { Workflow } from '../workflows/entities/workflow.entity'
import { WorkflowHistory } from '../workflows/entities/workflowHistory.entity'
import { WorkflowTask } from '../workflows/entities/workflowTask.entity'
import { WorkflowTaskCondition } from '../workflows/entities/workflowTaskCondition.entity'
import { WorkflowTaskResponse } from '../workflows/entities/workflowTaskResponse.entity'
import { WorkflowType } from '../workflows/entities/workflowType.entity'
import { WorkflowTypeAccess } from '../workflows/entities/workflowTypesAccess.entity'
import { WorkflowsService } from '../workflows/workflows.service'
import { WorkflowPerformedResponse } from '../workflowsPerformed/entities/workflowPerformedResponses.entity'
import { WorkflowPerformed } from '../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedService } from '../workflowsPerformed/workflowPerformed.service'
import { WorkflowClientRankingService } from '../workflowsPerformedTypes/clientRankings/clientRankings.service'
import { WorkflowClientRanking } from '../workflowsPerformedTypes/clientRankings/entities/workflowClientRanking.entity'
import { WorkflowClientRegisterService } from '../workflowsPerformedTypes/clientRegister/clientRegister.service'
import { ClientAdditionalInformation } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformation.entity'
import { ClientAdditionalInformationBankReference } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationBankReference.entity'
import { ClientAdditionalInformationCommercialReference } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationCommercialReference.entity'
import { ClientAdditionalInformationCounter } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationCounter.entity'
import { ClientAdditionalInformationCounterValue } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationCounterValue.entity'
import { ClientAdditionalInformationParticipationCompany } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationParticipationCompany.entity'
import { ClientAdditionalInformationRevenue } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationRevenue.entity'
import { ClientCadastralCheck } from '../workflowsPerformedTypes/clientRegister/entitites/clientCadastralCheck.entity'
import { ClientDocument } from '../workflowsPerformedTypes/clientRegister/entitites/clientDocument.entity'
import { ClientDocumentBalance } from '../workflowsPerformedTypes/clientRegister/entitites/clientDocumentBalance.entity'
import { ClientDocumentContractualAlteration } from '../workflowsPerformedTypes/clientRegister/entitites/clientDocumentContractualAlteration.entity'
import { ClientDocumentGeneral } from '../workflowsPerformedTypes/clientRegister/entitites/clientDocumentGeneral.entity'
import { ClientDocumentPre } from '../workflowsPerformedTypes/clientRegister/entitites/clientDocumentPre.entity'
import { ClientFinancial } from '../workflowsPerformedTypes/clientRegister/entitites/clientFinancial.entity'
import { ClientFiscalInformation } from '../workflowsPerformedTypes/clientRegister/entitites/clientFiscalInformation.entity'
import { ClientFiscalParametrization } from '../workflowsPerformedTypes/clientRegister/entitites/clientFiscalParametrization.entity'
import { ClientFiscalParametrizationCfop } from '../workflowsPerformedTypes/clientRegister/entitites/clientFiscalParametrizationCfop.entity'
import { ClientParametrization } from '../workflowsPerformedTypes/clientRegister/entitites/clientParametrization.entity'
import { ClientPriceList } from '../workflowsPerformedTypes/clientRegister/entitites/clientPriceList.entity'
import { ClientRegistrationInformation } from '../workflowsPerformedTypes/clientRegister/entitites/clientRegistrationInformation.entity'
import { WorkflowClientRegister } from '../workflowsPerformedTypes/clientRegister/entitites/workflowClientRegister'
import { WorkflowRegisterClientPerformed } from '../workflowsPerformedTypes/clientRegister/entitites/workflowClientRegisterPerformed.entity'
import { WorkflowClientUpdateService } from '../workflowsPerformedTypes/clientUpdate/clientUpdate.service'
import { WorkflowClientUpdate } from '../workflowsPerformedTypes/clientUpdate/entities/workflowClientUpdate.entity'
import { WorkflowClientUpdateAddress } from '../workflowsPerformedTypes/clientUpdate/entities/workflowClientUpdateAddress.entity'
import { ClientsService } from './clients.service'
import { ClientGroupsDto } from './dto/clientGroups.dto'
import { ClientGroupsQueryDto } from './dto/clientGroupsQuery.dto'
import { ClientGroupsResponseDto } from './dto/clientGroupsResponse.dto'

describe('ClientsService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: ClientsService
  let httpService: HttpService

  const authToken = '123'

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }
  })

  beforeEach(async () => {
    mockModel = MockModel()

    const fileModule = Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        DatabaseProviderMock,
        FilesService,
        {
          provide: getModelToken(File),
          useValue: mockModel
        },
        LogsServiceProvider
      ],
      exports: [FilesService]
    })

    const workflowsModule = Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        DatabaseProviderMock,
        WorkflowsService,
        {
          provide: getModelToken(Workflow),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTask),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTaskCondition),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTaskResponse),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowType),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTypeAccess),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowHistory),
          useValue: mockModel
        },
        {
          provide: getModelToken(Hierarchy),
          useValue: mockModel
        },
        LogsServiceProvider
      ],
      exports: [WorkflowsService]
    })

    const workflowsPerformedModule = Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule, workflowsModule as any],
      providers: [
        DatabaseProviderMock,
        WorkflowPerformedService,
        {
          provide: getModelToken(WorkflowPerformedResponse),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowPerformed),
          useValue: mockModel
        },
        {
          provide: getModelToken(Hierarchy),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTask),
          useValue: mockModel
        },
        LogsServiceProvider
      ],
      exports: [WorkflowPerformedService]
    })

    const workflowClientUpdateModule = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        workflowsPerformedModule as any
      ],
      providers: [
        DatabaseProviderMock,
        WorkflowClientUpdateService,
        {
          provide: getModelToken(WorkflowClientUpdate),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowClientUpdateAddress),
          useValue: mockModel
        },
        LogsServiceProvider
      ],
      exports: [WorkflowClientUpdateService]
    })

    const workflowClientRankingModule = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        workflowsPerformedModule as any
      ],
      providers: [
        DatabaseProviderMock,
        WorkflowClientRankingService,
        {
          provide: getModelToken(WorkflowClientRanking),
          useValue: mockModel
        },
        LogsServiceProvider
      ],
      exports: [WorkflowClientRankingService]
    })

    const workflowClientRegisterModule = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        workflowsPerformedModule as any,
        fileModule as any
      ],
      providers: [
        DatabaseProviderMock,
        WorkflowClientRegisterService,
        {
          provide: getModelToken(WorkflowClientUpdate),
          useValue: mockModel
        },
        { provide: getModelToken(WorkflowClientRegister), useValue: mockModel },
        {
          provide: getModelToken(ClientAdditionalInformation),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientAdditionalInformationRevenue),
          useValue: mockModel
        },
        {
          provide: getModelToken(
            ClientAdditionalInformationCommercialReference
          ),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientAdditionalInformationBankReference),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientAdditionalInformationCounter),
          useValue: mockModel
        },
        {
          provide: getModelToken(
            ClientAdditionalInformationParticipationCompany
          ),
          useValue: mockModel
        },
        { provide: getModelToken(ClientCadastralCheck), useValue: mockModel },
        { provide: getModelToken(ClientDocument), useValue: mockModel },
        { provide: getModelToken(ClientDocumentBalance), useValue: mockModel },
        {
          provide: getModelToken(ClientDocumentContractualAlteration),
          useValue: mockModel
        },
        { provide: getModelToken(ClientDocumentGeneral), useValue: mockModel },
        { provide: getModelToken(ClientDocumentPre), useValue: mockModel },
        { provide: getModelToken(ClientFinancial), useValue: mockModel },
        {
          provide: getModelToken(ClientFiscalInformation),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientFiscalParametrization),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientFiscalParametrizationCfop),
          useValue: mockModel
        },
        { provide: getModelToken(ClientParametrization), useValue: mockModel },
        { provide: getModelToken(ClientPriceList), useValue: mockModel },
        {
          provide: getModelToken(ClientRegistrationInformation),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientAdditionalInformationCounterValue),
          useValue: mockModel
        },
        { provide: getModelToken(WorkflowPerformed), useValue: mockModel },
        {
          provide: getModelToken(WorkflowRegisterClientPerformed),
          useValue: mockModel
        },
        {
          provide: getModelToken(File),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTask),
          useValue: mockModel
        },
        {
          provide: getModelToken(WorkflowTaskResponse),
          useValue: mockModel
        },
        LogsServiceProvider
      ],
      exports: [WorkflowClientRegisterService]
    })

    const clientRankingModule = Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        DatabaseProviderMock,
        ClientRankingsService,
        {
          provide: getModelToken(Ranking),
          useValue: mockModel
        },
        {
          provide: getModelToken(RankingIndicatorValue),
          useValue: mockModel
        },
        LogsServiceProvider
      ],
      exports: [ClientRankingsService]
    })

    const hierarchyModule = Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        DatabaseProviderMock,
        HierarchyService,
        {
          provide: getModelToken(Hierarchy),
          useValue: mockModel
        },
        {
          provide: getModelToken(UserRepresentativeCode),
          useValue: mockModel
        },
        LogsServiceProvider
      ],
      exports: [HierarchyService]
    })

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        clientRankingModule as any,
        workflowClientRegisterModule as any,
        workflowClientRankingModule as any,
        workflowClientUpdateModule as any,
        workflowsPerformedModule as any,
        hierarchyModule as any
      ],
      providers: [
        DatabaseProviderMock,
        ClientsService,
        {
          provide: getModelToken(ClientRanking),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientRankingIndicator),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<ClientsService>(ClientsService)
    httpService = module.get<HttpService>(HttpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })



  describe('Groups', () => {
    const queryParams: ClientGroupsQueryDto = {
      nameClientGroup: null,
      codeClientGroup: null,
      page: 1,
      pageSize: 1,
      sort: null
    }
    it('shoul return clients groups', async () => {
      const clientsGroupsApiResponse: ClientGroupsResponseDto = {
        totalRegisters: 1,
        page: 1,
        dataExecucao: new Date(),
        gruposCliente: [{ codigogrupocliente: 1, nomegrupocliente: 'Client' }]
      }
      const apiResponse = OkResponse(clientsGroupsApiResponse)
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(apiResponse))

      const expectedResponse: ClientGroupsDto[] = [
        {
          codeClientGroup: 1,
          nameClientGroup: 'Client'
        }
      ]
      const response = await service.getGroups(queryParams, authToken)
      expect(response).toEqual(expectedResponse)
    })
    it('should throw a unauthorized exception', async () => {
      const apiResponse = UnauthorizedResponse()
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(apiResponse))
      let error

      try {
        await service.getGroups(queryParams, authToken)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(UnauthorizedException)
    })
    it('should throw a internal server error exception', async () => {
      const apiResponse = InternalServerErrorResponse()
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(apiResponse))
      let error

      try {
        await service.getGroups(queryParams, authToken)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(InternalServerErrorException)
    })
  })

  describe('Categories', () => {
    it('should return ABC', async () => {
      const expectedResponse = ['A', 'B', 'C']
      const response = service.getClientCategory()
      expect(response).toEqual(expectedResponse)
    })
  })
})
