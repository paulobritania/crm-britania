import { Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { Field } from './entities/field.entity'
import { FieldsService } from './fields.service'

describe('FieldsService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: FieldsService

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
        FieldsService,
        {
          provide: getModelToken(Field),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<FieldsService>(FieldsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Field CRUD operations', () => {
    it('should list all fields', async () => {
      const fields = [{
        id: 1,
        name: 'CEP',
        alias: 'CEP',
        accessId: 10
      }, {
        id: 2,
        name: 'CPF',
        alias: 'CPF',
        accessId: 10
      }]

      mockModel.findAll.mockReturnValue(fields)
      const result = await service.findByAccessId(10)

      expect(result.length).toBe(2)
      expect(result[0]).toHaveProperty('alias')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('accessId')
      expect(result[0].name).toEqual('CEP')
      expect(result[1].alias).toEqual('CPF')
    })
  })
})
