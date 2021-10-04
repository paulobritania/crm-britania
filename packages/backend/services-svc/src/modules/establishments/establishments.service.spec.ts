import { HttpModule, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { LogsService } from '../../utils/mocks/LogsService'
import { EstablishmentsService } from './establishments.service'

describe('EstablishmentsService', () => {
  let LogsServiceProvider: Provider
  let service: EstablishmentsService

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [
        DatabaseProviderMock,
        EstablishmentsService,
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<EstablishmentsService>(EstablishmentsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
