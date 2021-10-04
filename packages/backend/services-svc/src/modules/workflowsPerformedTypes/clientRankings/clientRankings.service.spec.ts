import { Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../../database/database.provider.mock'
import { LogsService } from '../../../utils/mocks/LogsService'
import { IMockModel, MockModel } from '../../../utils/mocks/Model'
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
import { WorkflowClientRankingService } from './clientRankings.service'
import { WorkflowClientRanking } from './entities/workflowClientRanking.entity'

describe('WorkflowClientRankingService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: WorkflowClientRankingService

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }
  })

  beforeEach(async () => {
    mockModel = MockModel()

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
      imports: [ConfigModule.forRoot(), workflowsPerformedModule as any],
      providers: [
        DatabaseProviderMock,
        WorkflowClientRankingService,
        {
          provide: getModelToken(WorkflowClientRanking),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<WorkflowClientRankingService>(WorkflowClientRankingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
