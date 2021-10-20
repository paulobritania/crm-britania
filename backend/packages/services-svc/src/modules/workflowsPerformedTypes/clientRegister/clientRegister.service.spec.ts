import { Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../../database/database.provider.mock'
import { LogsService } from '../../../utils/mocks/LogsService'
import { IMockModel, MockModel } from '../../../utils/mocks/Model'
import { File } from '../../files/entities/file.entity'
import { FilesService } from '../../files/files.service'
import { Hierarchy } from '../../hierarchy/entities/hierarchy.entity'
import { Workflow } from '../../workflows/entities/workflow.entity'
import { WorkflowHistory } from '../../workflows/entities/workflowHistory.entity'
import { WorkflowTask } from '../../workflows/entities/workflowTask.entity'
import { WorkflowTaskCondition } from '../../workflows/entities/workflowTaskCondition.entity'
import { WorkflowTaskResponse } from '../../workflows/entities/workflowTaskResponse.entity'
import { WorkflowType } from '../../workflows/entities/workflowType.entity'
import { WorkflowTypeAccess } from '../../workflows/entities/workflowTypesAccess.entity'
import { WorkflowsService } from '../../workflows/workflows.service'
import { WorkflowPerformedResponse } from '../../workflowsPerformed/entities/workflowPerformedResponses.entity'
import { WorkflowPerformed } from '../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedService } from '../../workflowsPerformed/workflowPerformed.service'
import { WorkflowClientRegisterService } from './clientRegister.service'
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

describe('WorkflowClientRegisterService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: WorkflowClientRegisterService

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
      imports: [ConfigModule.forRoot(), workflowsModule as any],
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
        LogsServiceProvider
      ],
      exports: [WorkflowPerformedService]
    })

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        workflowsPerformedModule as any,
        fileModule as any
      ],
      providers: [
        DatabaseProviderMock,
        WorkflowClientRegisterService,
        LogsServiceProvider,
        {
          provide: getModelToken(WorkflowRegisterClientPerformed),
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
        { provide: getModelToken(WorkflowPerformed), useValue: mockModel },
        { provide: getModelToken(WorkflowClientRegister), useValue: mockModel },
        {
          provide: getModelToken(ClientRegistrationInformation),
          useValue: mockModel
        },
        { provide: getModelToken(ClientPriceList), useValue: mockModel },
        { provide: getModelToken(ClientParametrization), useValue: mockModel },
        {
          provide: getModelToken(ClientFiscalParametrizationCfop),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientFiscalParametrization),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientFiscalInformation),
          useValue: mockModel
        },
        { provide: getModelToken(ClientFinancial), useValue: mockModel },
        { provide: getModelToken(ClientDocumentPre), useValue: mockModel },
        { provide: getModelToken(ClientDocumentGeneral), useValue: mockModel },
        {
          provide: getModelToken(ClientDocumentContractualAlteration),
          useValue: mockModel
        },
        { provide: getModelToken(ClientDocumentBalance), useValue: mockModel },
        { provide: getModelToken(ClientDocument), useValue: mockModel },
        { provide: getModelToken(ClientCadastralCheck), useValue: mockModel },
        {
          provide: getModelToken(ClientAdditionalInformationRevenue),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientAdditionalInformationCounter),
          useValue: mockModel
        },
        {
          provide: getModelToken(ClientAdditionalInformationCounterValue),
          useValue: mockModel
        },
        {
          provide: getModelToken(
            ClientAdditionalInformationParticipationCompany
          ),
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
          provide: getModelToken(ClientAdditionalInformation),
          useValue: mockModel
        },
        {
          provide: getModelToken(File),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<WorkflowClientRegisterService>(
      WorkflowClientRegisterService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
