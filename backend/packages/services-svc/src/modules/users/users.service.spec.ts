import { BadRequestException, HttpModule, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { QueryUtilsDto } from '../../utils/dto/queryUtils'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { Address } from '../address/entities/address.entity'
import { File } from '../files/entities/file.entity'
import { FilesService } from '../files/files.service'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { HierarchyService } from '../hierarchy/hierarchy.service'
import { Profile } from '../profiles/entities/profile.entity'
import { RepresentativeDto } from '../representatives/dtos/representative.dto'
import { RepresentativesService } from '../representatives/representatives.service'
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
import { CreateUserDto } from './dto/userCreate.dto'
import { UpdateUserProfilesDto } from './dto/userProfiles.dto'
import { UpdateUserDto } from './dto/userUpdate.dto'
import { User } from './entities/user.entity'
import { UserProfile } from './entities/userProfile.entity'
import { UserRepresentativeCode } from './entities/userRepresentativeCode.entity'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: UsersService
  let representativesService: RepresentativesService
  let newUser: CreateUserDto
  const authToken = 'qweuhrk='

  const userId = 1

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }

    newUser = {
      imageId: null,
      username: 'testuser',
      email: 'valid@email.com',
      phone: null,
      customerHierarchyEnabled: false,
      representativeCodes: ['ABC-001', 'ABC-002'],
      substituteUserId: null,
      isActive: true,
      profiles: [1],
      substituteUserStartDate: new Date(),
      substituteUserEndDate: new Date()
    }
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

    const representativesModule = Test.createTestingModule({
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
        }
      ],
      exports: [RepresentativesService]
    })

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        representativesModule as any,
        hierarchyModule as any
      ],
      providers: [
        DatabaseProviderMock,
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockModel
        },
        {
          provide: getModelToken(UserRepresentativeCode),
          useValue: mockModel
        },
        {
          provide: getModelToken(UserProfile),
          useValue: mockModel
        },
        {
          provide: getModelToken(Profile),
          useValue: mockModel
        },
        {
          provide: getModelToken(Hierarchy),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
    representativesService = module.get<RepresentativesService>(
      RepresentativesService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Search by autocomplete', () => {
    it('should return a list with one user', async () => {
      mockModel.findAll.mockReturnValue([
        {
          id: 1,
          username: 'John Doe'
        }
      ])

      const result = await service.autocomplete({ name: 'doe' })
      expect(result).toHaveLength(1)
      expect(mockModel.findAll).toHaveBeenCalledTimes(1)
    })
  })

  describe('User CRUD operations', () => {
    it('should list all users', async () => {
      const query: QueryUtilsDto = {
        limit: null,
        offset: null,
        startDate: null,
        endDate: null
      }

      const user1 = {
        id: 1,
        username: 'John Doe',
        userProfiles: []
      }
      const user2 = {
        id: 2,
        username: 'Maria Doe',
        userProfiles: []
      }

      const users = [
        { ...user1, toJSON: () => user1 },
        { ...user2, toJSON: () => user2 }
      ]

      mockModel.findAll.mockReturnValue(users)
      const result = await service.findAll(query)

      expect(result.length).toBe(2)
      expect(result[1]).toHaveProperty('username')
      expect(result[1].username).toEqual('Maria Doe')
    })

    it('should list all users with filters', async () => {
      const query: QueryUtilsDto = {
        limit: 1,
        offset: 1,
        startDate: null,
        endDate: null
      }

      const user1 = {
        id: 1,
        username: 'John Doe',
        userProfiles: [
          {
            profileId: 1,
            profile: {
              name: 'John Doe'
            }
          }
        ],
        representativeCodes: [{ code: 1 }]
      }
      const user2 = {
        id: 2,
        username: 'Maria Doe'
      }

      const users = [
        { ...user1, toJSON: () => user1 },
        { ...user2, toJSON: () => user2 }
      ]

      mockModel.findAll.mockReturnValue(users)
      const result = await service.findAll(query)

      expect(result.length).toBe(2)
      expect(result[1]).toHaveProperty('username')
      expect(result[1].username).toEqual('Maria Doe')
    })

    it('should create an user, commit operation and return the new user ID', async () => {
      const value = { id: 1, get: jest.fn() }
      mockModel.create.mockReturnValue(value)

      jest
        .spyOn(service, 'updateUserProfiles')
        .mockImplementationOnce(() => Promise.resolve())

      const result = await service.create(newUser, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBe(1)
    })

    it('should create an user with no codes, commit operation and return the new user ID', async () => {
      const value = { id: 1, get: jest.fn() }
      mockModel.create.mockReturnValue(value)

      jest
        .spyOn(service, 'updateUserProfiles')
        .mockImplementationOnce(() => Promise.resolve())

      const result = await service.create(
        {
          ...newUser,
          representativeCodes: null,
          substituteUserStartDate: null,
          substituteUserEndDate: null
        },
        userId
      )
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBe(1)
    })

    it('should NOT create an user because the user already exists', async () => {
      const someUser = { id: 1, ...newUser }
      mockModel.findOne.mockReturnValue(someUser)

      const transaction = DatabaseProviderMock.useFactory().transaction()
      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.create(newUser, userId)
      } catch (error) {
        expect(error.message).toEqual(
          'Já existe um usuário com o nome informado'
        )
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should delete an user and commit the operation', async () => {
      const value = { id: 1, destroy: jest.fn(), get: jest.fn() }
      mockModel.findByPk.mockReturnValue(value)
      mockModel.destroy.mockReturnValue(value.id)

      const result = await service.delete(value.id, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBeUndefined()
    })

    it('should NOT delete an user that does not exists', async () => {
      const transaction = DatabaseProviderMock.useFactory().transaction()
      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      mockModel.findByPk.mockReturnValue(null)

      try {
        await service.delete(1, userId)
      } catch (error) {
        expect(error.message).toEqual('Usuário não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should update an user, commit the operation and return it', async () => {
      const user: UpdateUserDto = {
        imageId: null,
        username: 'testuser',
        email: 'valid@email.com',
        phone: null,
        customerHierarchyEnabled: false,
        representativeCodes: null,
        substituteUserId: 1,
        substituteUserStartDate: new Date(),
        substituteUserEndDate: new Date(),
        isActive: true,
        profiles: []
      }

      const value = { id: userId, ...user }
      const updatedUser = { ...value, email: 'valid@email.com.br' }

      mockModel.findByPk.mockReturnValue({
        ...value,
        get: jest.fn(),
        reload: jest.fn(() => updatedUser)
      })

      jest
        .spyOn(service, 'updateUserProfiles')
        .mockImplementationOnce(() => Promise.resolve())

      const result = await service.update(1, user, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toHaveProperty('email')
      expect(result.email).toEqual('valid@email.com.br')
    })

    it('should update an user with representative codes, commit the operation and return it', async () => {
      const user: UpdateUserDto = {
        imageId: null,
        username: 'testuser',
        email: 'valid@email.com',
        phone: null,
        customerHierarchyEnabled: false,
        representativeCodes: ['123'],
        substituteUserId: null,
        substituteUserStartDate: null,
        substituteUserEndDate: null,
        isActive: true,
        profiles: []
      }

      const value = { id: userId, ...user }
      const updatedUser = { ...value, email: 'valid@email.com.br' }

      mockModel.findByPk.mockReturnValue({
        ...value,
        get: jest.fn(),
        reload: jest.fn(() => updatedUser)
      })
      mockModel.create.mockReturnValue({ id: 1 })

      jest
        .spyOn(service, 'updateUserProfiles')
        .mockImplementationOnce(() => Promise.resolve())

      const result = await service.update(1, user, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toHaveProperty('email')
      expect(result.email).toEqual('valid@email.com.br')
    })

    it('should update an user when user does not exist', async () => {
      const user: UpdateUserDto = {
        imageId: null,
        username: 'testuser',
        email: 'valid@email.com',
        phone: null,
        customerHierarchyEnabled: false,
        representativeCodes: [],
        substituteUserId: null,
        substituteUserStartDate: null,
        substituteUserEndDate: null,
        isActive: true,
        profiles: []
      }
      let error = null

      mockModel.findByPk.mockReturnValue(null)

      try {
        await service.update(1, user, userId)
      } catch (err) {
        error = err
      }
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
      expect(transaction.commit()).toBeTruthy()
      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
    })

    it('should return undefined when user is not found', async () => {
      const id = 1

      const user = undefined

      mockModel.findByPk.mockReturnValue(user)
      jest.spyOn(representativesService, 'findByCode').mockResolvedValue(null)
      const result = await service.findById(id, authToken)

      expect(result).toBeUndefined()
    })

    it('should return a user by id', async () => {
      const id = 1
      const representative: RepresentativeDto = { code: 1, name: 'test' }
      const user = {
        id,
        username: 'testuser',
        email: 'johndoe@test.com',
        phone: null,
        customerHierarchyEnabled: false,
        substituteUserId: null,
        substituteUserPeriod: null,
        isActive: true,
        representativeCodes: [representative],
        userProfiles: [
          { profileId: 1, userId: id, profile: { id: 1, name: 'TEST' } }
        ],
        file: { id: 1, filename: 'test', contentType: 'test', path: 'test' }
      }

      mockModel.findByPk.mockReturnValue({ ...user, toJSON: () => user })
      jest
        .spyOn(representativesService, 'findByCode')
        .mockResolvedValue(representative)
      const result = await service.findById(id, authToken)

      expect(result.id).toEqual(id)
      expect(result).toHaveProperty('username')
    })

    it('should return a user by id with no representatives and profiles', async () => {
      const id = 1

      const user = {
        id,
        username: 'testuser',
        email: 'johndoe@test.com',
        phone: null,
        customerHierarchyEnabled: false,
        substituteUserId: null,
        substituteUserPeriod: null,
        isActive: true,
        representativeCodes: null,
        userProfiles: null,
        file: { id: 1, filename: 'test', contentType: 'test', path: 'test' }
      }

      mockModel.findByPk.mockReturnValue({ ...user, toJSON: () => user })
      const result = await service.findById(id, authToken)

      expect(result.id).toEqual(id)
      expect(result).toHaveProperty('username')
    })

    it('should find a user by username', async () => {
      const id = 1
      const username = 'testuser'
      const user = { id }

      mockModel.findOne.mockReturnValue(user)
      const result = await service.findByUsername(username)

      expect(result.id).toEqual(id)
    })
  })

  describe('Update user profiles', () => {
    it('should update user profiles', async () => {
      const data: UpdateUserProfilesDto = {
        profiles: [1]
      }
      const user = { id: 1 }
      const oldUserProfiles = [{ id: 1 }]
      const profiles = [{ id: 1 }]

      mockModel.findByPk.mockReturnValue(user)
      mockModel.findAll
        .mockReturnValueOnce(oldUserProfiles)
        .mockReturnValueOnce(profiles)
      mockModel.destroy.mockReturnValue(1)
      mockModel.upsert.mockReturnValue(true)

      await service.updateUserProfiles(1, data, userId)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
    })

    it('should update user profiles with external transaction', async () => {
      const data: UpdateUserProfilesDto = {
        profiles: [1]
      }
      const user = { id: 1 }
      const oldUserProfiles = [{ id: 1 }]
      const profiles = [{ id: 1 }]

      mockModel.findByPk.mockReturnValue(user)
      mockModel.findAll
        .mockReturnValueOnce(oldUserProfiles)
        .mockReturnValueOnce(profiles)
      mockModel.destroy.mockReturnValue(1)
      mockModel.upsert.mockReturnValue(true)

      const transaction = DatabaseProviderMock.useFactory().transaction()
      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      await service.updateUserProfiles(userId, data, userId, transaction as any)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should throw an exception when user does not exist', async () => {
      const data: UpdateUserProfilesDto = {
        profiles: [1]
      }
      let error = null

      mockModel.findByPk.mockReturnValue(null)
      mockModel.findAll.mockReturnValueOnce([]).mockReturnValueOnce([])
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.updateUserProfiles(1, data, userId)
      } catch (err) {
        error = err
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
      expect(transaction.commit()).toBeTruthy()
      expect(error).not.toBeNull()
    })

    it('should throw an exception when user does not exist with external transaction', async () => {
      const data: UpdateUserProfilesDto = {
        profiles: [1]
      }
      let error = null

      mockModel.findByPk.mockReturnValue(null)
      mockModel.findAll.mockReturnValueOnce([]).mockReturnValueOnce([])
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.updateUserProfiles(
          userId,
          data,
          userId,
          transaction as any
        )
      } catch (err) {
        error = err
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(error).not.toBeNull()
    })
  })

  describe('Get user profiles', () => {
    it('should return a list with one user profile', async () => {
      const profileId = 1

      mockModel.findAll.mockReturnValue([
        {
          profileId,
          userId
        }
      ])

      const expectedResponse = {
        data: [profileId]
      }

      const result = await service.getUserProfiles(1)

      expect(mockModel.findAll).toHaveBeenCalled()
      expect(result).toEqual(expectedResponse)
    })
  })

  describe('getUserProfilesDetails', () => {
    it('should return a list with one user profile', async () => {
      const profileId = 1
      const accessId = 1
      const fieldId = 1

      const modelResponse = {
        profileId,
        profile: {
          name: 'TEST',
          accesses: [
            {
              access: {
                alias: 'TEST',
                id: accessId,
                fields: [
                  {
                    id: fieldId,
                    alias: 'TEST'
                  }
                ]
              }
            }
          ],
          permissions: [
            {
              permission: {
                alias: 'TEST',
                accessId
              }
            },
            {
              permission: {
                alias: 'TEST2',
                accessId
              }
            }
          ],
          exceptions: [
            {
              accessId,
              access: {
                alias: 'TEST',
                id: accessId
              },
              permission: {
                id: 2,
                alias: 'TEST2'
              }
            }
          ],
          micros: []
        }
      }

      mockModel.findAll.mockReturnValue([
        { ...modelResponse, toJSON: () => modelResponse }
      ])

      const expectedResponse = [
        {
          name: modelResponse.profile.name,
          accesses: [
            {
              name: modelResponse.profile.accesses[0].access.alias,
              permissions: [
                modelResponse.profile.permissions[0].permission.alias
              ],
              fields: [modelResponse.profile.accesses[0].access.fields[0].alias]
            }
          ]
        }
      ]

      const result = await service.getUserProfilesDetails(userId)

      expect(mockModel.findAll).toHaveBeenCalled()
      expect(result).toEqual(expectedResponse)
    })
  })
})
