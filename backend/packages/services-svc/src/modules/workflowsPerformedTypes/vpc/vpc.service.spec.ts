import { HttpModule, Provider } from '@nestjs/common'
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
import { WorkflowVpc } from './entities/workflowVpc.entity'
import { WorkflowVpcAttachment } from './entities/workflowVpcAttachments.entity'
import { WorkflowVpcLineFamily } from './entities/workflowVpcLineFamily.entity'
import { WorkflowVpcNd } from './entities/workflowVpcNd.entity'
import { WorkflowVpcPerformed } from './entities/workflowVpcPerformed.entity'
import { WorkflowVpcProduct } from './entities/workflowVpcProduct.entity'
import { WorkflowVpcRequest } from './entities/workflowVpcRequests.entity'
import { WorkflowVpcStatus } from './entities/workflowVpcStatus.entity'
import { WorkflowVpcService } from './vpc.service'

describe('WorkflowVpcService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: WorkflowVpcService

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
        fileModule as any,
        HttpModule
      ],
      providers: [
        DatabaseProviderMock,
        WorkflowVpcService,
        LogsServiceProvider,
        { provide: getModelToken(WorkflowVpc), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcAttachment), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcLineFamily), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcNd), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcProduct), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcRequest), useValue: mockModel },
        { provide: getModelToken(WorkflowPerformed), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcPerformed), useValue: mockModel },
        { provide: getModelToken(File), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcStatus), useValue: mockModel }

      ]
    }).compile()

    service = module.get<WorkflowVpcService>(WorkflowVpcService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
