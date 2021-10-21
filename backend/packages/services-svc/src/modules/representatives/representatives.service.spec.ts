import {
  HttpModule,
  HttpService,
  InternalServerErrorException,
  Provider,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'
import { throwError, of } from 'rxjs'

import DatabaseProviderMock from '../../database/database.provider.mock'
import {
  UnauthorizedResponse,
  BadRequestResponse,
  OkResponse
} from '../../utils/mocks/AxiosResponses'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { Address } from '../address/entities/address.entity'
import { File } from '../files/entities/file.entity'
import { FilesService } from '../files/files.service'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
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
import { RepresentativeBankData } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeBankData.entity'
import { RepresentativeCommissionPercentage } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeCommissionPercentage.entity'
import { RepresentativeDocument } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeDocument.entity'
import { RepresentativeFinancial } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeFinancial.entity'
import { RepresentativeMaintenance } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeMaintenance.entity'
import { WorkflowRepresentativeRegistrationPerformed } from '../workflowsPerformedTypes/representativeRegistration/entities/worfklowRepresentativeRegistrationPerformed.entity'
import { WorkflowRepresentativeRegistration } from '../workflowsPerformedTypes/representativeRegistration/entities/workflowRepresentativeRegistration.entity'
import { RepresentativeRegistrationService } from '../workflowsPerformedTypes/representativeRegistration/representativeRegistration.service'
import { RepresentativeDto } from './dtos/representative.dto'
import { RepresentativeResponseDto } from './dtos/representativeResponse.dto'
import { RepresentativeQueryStringDto } from './dtos/representativesQueryString'
import { RepresentativesResponseDto } from './dtos/representativesResponse.dto'
import { RepresentativesService } from './representatives.service'

describe('RepresentativesService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: RepresentativesService
  let httpService: HttpService

  const authToken = '123'

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }
  })

  beforeEach(async () => {
    mockModel = MockModel()

    const filesModule = Test.createTestingModule({
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

    const representativeRegistrationModule = Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        workflowsPerformedModule as any,
        filesModule as any
      ],
      providers: [
        DatabaseProviderMock,
        RepresentativeRegistrationService,
        {
          provide: getModelToken(WorkflowRepresentativeRegistration),
          useValue: mockModel
        },
        { provide: getModelToken(RepresentativeBankData), useValue: mockModel },
        {
          provide: getModelToken(RepresentativeFinancial),
          useValue: mockModel
        },
        { provide: getModelToken(Address), useValue: mockModel },
        {
          provide: getModelToken(RepresentativeMaintenance),
          useValue: mockModel
        },
        {
          provide: getModelToken(RepresentativeCommissionPercentage),
          useValue: mockModel
        },
        { provide: getModelToken(RepresentativeDocument), useValue: mockModel },
        {
          provide: getModelToken(WorkflowRepresentativeRegistrationPerformed),
          useValue: mockModel
        },
        { provide: getModelToken(WorkflowPerformed), useValue: mockModel },
        LogsServiceProvider
      ],
      exports: [RepresentativeRegistrationService]
    })

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        workflowsPerformedModule as any,
        representativeRegistrationModule as any
      ],
      providers: [
        DatabaseProviderMock,
        RepresentativesService,
        {
          provide: getModelToken(WorkflowRepresentativeRegistration),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<RepresentativesService>(RepresentativesService)
    httpService = module.get<HttpService>(HttpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Find all representatives', () => {
    it('should throw a unauthorized error', async () => {
      const apiResponse = UnauthorizedResponse()
      const params: RepresentativeQueryStringDto = {
        page: 0,
        pageSize: 10,
        name: ''
      }
      let error = null

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(apiResponse))

      try {
        await service.findAll(params, authToken)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(UnauthorizedException)
    })

    it('should throw a bad request error', async () => {
      const apiResponse = BadRequestResponse()
      const params: RepresentativeQueryStringDto = {
        page: 0,
        pageSize: 10,
        name: ''
      }
      let error = null

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(apiResponse))

      try {
        await service.findAll(params, authToken)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(InternalServerErrorException)
    })

    it('should return representatives', async () => {
      const code = 1
      const name = 'Test'
      const representativesApiResponse: RepresentativesResponseDto = {
        page: 1,
        dataExecucao: '',
        totalRegisters: 1,
        representantes: [
          {
            codigorepresentante: code,
            nomerepresentante: name
          }
        ]
      }
      const apiResponse = OkResponse(representativesApiResponse)
      const representatives: RepresentativeDto[] = [{ code, name }]
      const params: RepresentativeQueryStringDto = {
        page: 0,
        pageSize: 10,
        name: ''
      }

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(apiResponse))

      const response = await service.findAll(params, authToken)

      expect(response).toEqual(representatives)
    })
  })

  describe('Find one representative', () => {
    it('should throw a unauthorized error', async () => {
      const apiResponse = UnauthorizedResponse()
      const code = 123
      let error = null

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(apiResponse))

      try {
        await service.findByCode(code, authToken)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(UnauthorizedException)
    })

    it('should throw a bad request error', async () => {
      const apiResponse = BadRequestResponse()
      const code = 123
      let error = null

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(throwError(apiResponse))

      try {
        await service.findByCode(code, authToken)
      } catch (err) {
        error = err
      }

      expect(error).toBeInstanceOf(InternalServerErrorException)
    })

    it('should return representatives', async () => {
      const code = 123
      const name = 'Test'
      const representativeApiResponse: RepresentativeResponseDto = {
        codigoRepresentante: code,
        nomeRepresentante: name
      }
      const apiResponse = OkResponse(representativeApiResponse)
      const representative: RepresentativeDto = { code, name }

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(apiResponse))

      const response = await service.findByCode(code, authToken)

      expect(response).toEqual(representative)
    })
  })
})
