import { Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { Permission } from './entities/permission.entity'
import { PermissionsService } from './permissions.service'

describe('PermissionsService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: PermissionsService

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
        PermissionsService,
        {
          provide: getModelToken(Permission),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<PermissionsService>(PermissionsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Permission CRUD operations', () => {
    it('should list all (reduced number) permissions', async () => {
      const permissions = [{
        id: 1,
        name: 'Aprovar'
      }, {
        id: 2,
        name: 'Reprovar'
      }]

      mockModel.findAll.mockReturnValue(permissions)
      const result = await service.findAll()

      expect(result.length).toBe(2)
      expect(result[1]).toHaveProperty('name')
      expect(result[1].name).toEqual('Reprovar')
    })
  })
})
