import { Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { File } from '../files/entities/file.entity'
import { FilesService } from '../files/files.service'
import { ConfigurationsService } from './configurations.service'
import { Document } from './entities/document.entity'

describe('ConfigurationsService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: ConfigurationsService

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

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), fileModule as any],
      providers: [
        DatabaseProviderMock,
        ConfigurationsService,
        {
          provide: getModelToken(File),
          useValue: mockModel
        },
        {
          provide: getModelToken(Document),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<ConfigurationsService>(ConfigurationsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
