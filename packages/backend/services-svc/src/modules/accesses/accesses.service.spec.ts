import { Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { AccessesService } from './accesses.service'
import { Access } from './entities/access.entity'

describe('AccessesService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: AccessesService

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }
  })

  beforeEach(async () => {
    mockModel = MockModel()
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot()
      ],
      providers: [
        DatabaseProviderMock,
        AccessesService,
        {
          provide: getModelToken(Access),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<AccessesService>(AccessesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Access CRUD operations', () => {
    it('should list all (reduced number) accesses', async () => {
      const accesses = [{
        id: 1,
        name: 'Todos Menus'
      }, {
        id: 2,
        name: 'Administrativo'
      }]

      mockModel.findAll.mockReturnValue(accesses)
      const result = await service.findAll()

      expect(result.length).toBe(2)
      expect(result[1]).toHaveProperty('name')
      expect(result[1].name).toEqual(accesses[1].name)
    })
  })
})
