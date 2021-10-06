import { HttpModule, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { LogsService } from '../../utils/mocks/LogsService'
import { LinesService } from './lines.service'

describe('LinesService', () => {
  let LogsServiceProvider: Provider
  let service: LinesService

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [DatabaseProviderMock, LinesService, LogsServiceProvider]
    }).compile()

    service = module.get<LinesService>(LinesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
