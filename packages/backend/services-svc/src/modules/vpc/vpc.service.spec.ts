import { HttpModule, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { File } from '../files/entities/file.entity'
import { FilesService } from '../files/files.service'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { HierarchyService } from '../hierarchy/hierarchy.service'
import { User } from '../users/entities/user.entity'
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
import { WorkflowVpc } from '../workflowsPerformedTypes/vpc/entities/workflowVpc.entity'
import { WorkflowVpcAttachment } from '../workflowsPerformedTypes/vpc/entities/workflowVpcAttachments.entity'
import { WorkflowVpcLineFamily } from '../workflowsPerformedTypes/vpc/entities/workflowVpcLineFamily.entity'
import { WorkflowVpcNd } from '../workflowsPerformedTypes/vpc/entities/workflowVpcNd.entity'
import { WorkflowVpcPerformed } from '../workflowsPerformedTypes/vpc/entities/workflowVpcPerformed.entity'
import { WorkflowVpcProduct } from '../workflowsPerformedTypes/vpc/entities/workflowVpcProduct.entity'
import { WorkflowVpcRequest } from '../workflowsPerformedTypes/vpc/entities/workflowVpcRequests.entity'
import { WorkflowVpcStatus } from '../workflowsPerformedTypes/vpc/entities/workflowVpcStatus.entity'
import { WorkflowVpcService } from '../workflowsPerformedTypes/vpc/vpc.service'
import { VpcService } from './vpc.service'

describe('VpcService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: VpcService

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }
  })

  beforeEach(async () => {
    mockModel = MockModel()

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
        LogsServiceProvider
      ],
      exports: [WorkflowPerformedService]
    })

    const vpcModule = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        workflowsPerformedModule as any,
        fileModule as any
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
      ],
      exports: [WorkflowVpcService]
    })

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot(),
        fileModule as any,
        vpcModule as any,
        workflowsModule as any,
        hierarchyModule as any,
        workflowsPerformedModule as any
      ],
      providers: [
        DatabaseProviderMock,
        VpcService,
        LogsServiceProvider,
        { provide: getModelToken(Hierarchy), useValue: mockModel },
        { provide: getModelToken(User), useValue: mockModel },
        { provide: getModelToken(WorkflowVpc), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcAttachment), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcNd), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcProduct), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcProduct), useValue: mockModel },
        { provide: getModelToken(WorkflowVpcLineFamily), useValue: mockModel },
        { provide: getModelToken(Workflow), useValue: mockModel },
        { provide: getModelToken(WorkflowTask), useValue: mockModel },
        { provide: getModelToken(WorkflowType), useValue: mockModel }
      ]
    }).compile()

    service = module.get<VpcService>(VpcService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
