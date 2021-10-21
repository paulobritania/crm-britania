import {
  BadRequestException,
  HttpModule,
  InternalServerErrorException,
  Provider
} from '@nestjs/common'
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
import { RepresentativesService } from '../representatives/representatives.service'
import { User } from '../users/entities/user.entity'
import { UserProfile } from '../users/entities/userProfile.entity'
import { UserRepresentativeCode } from '../users/entities/userRepresentativeCode.entity'
import { UsersService } from '../users/users.service'
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
import { CreateMessageDto } from './dto/createMessage.dto'
import { MessageBoardsWithFilterRequestDto } from './dto/messageBoardsWithFilterRequestDto.dto'
import { UpdateMessageDto } from './dto/updateMessage.dto'
import { MessageProfilesAssoc } from './entities/messageAssocProfiles.entity'
import { MessageBoard } from './entities/messageBoard.entity'
import { MessageBoardsFile } from './entities/messageBoardFile.entity'
import { MessageBoardsService } from './messageBoards.service'

describe('MessageBoardsService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: MessageBoardsService
  let filesService: FilesService
  let usersService: UsersService
  let createMessage: CreateMessageDto
  let updateMessage: UpdateMessageDto

  const userId = 1

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }

    createMessage = {
      title: 'title text',
      content: 'Content text test',
      expirationDate: new Date().toISOString(),
      homeScreen: '0',
      profiles: '1, 2, 3',
      createdBy: 1,
      files: []
    }
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
        fileModule as any
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

    const userModule = Test.createTestingModule({
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
      ],
      exports: [UsersService]
    })

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), fileModule as any, userModule as any],
      providers: [
        DatabaseProviderMock,
        MessageBoardsService,
        {
          provide: getModelToken(MessageBoard),
          useValue: mockModel
        },
        {
          provide: getModelToken(MessageProfilesAssoc),
          useValue: mockModel
        },
        {
          provide: getModelToken(MessageBoardsFile),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<MessageBoardsService>(MessageBoardsService)
    filesService = module.get<FilesService>(FilesService)
    usersService = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Message board CRUD operations', () => {
    it('should list all messages', async () => {
      const query: QueryUtilsDto = {
        limit: null,
        offset: null,
        startDate: null,
        endDate: null
      }

      const messages = [
        {
          id: 1,
          title: 'title text',
          content: 'content text',
          expirationDate: new Date().toISOString()
        },
        {
          id: 2,
          title: 'title text',
          content: 'Content text test',
          expirationDate: new Date().toISOString()
        }
      ]

      mockModel.findAll.mockReturnValue(messages)
      const result = await service.findAll(query, userId)

      expect(result[1]).toHaveProperty('id')
      expect(result[1]).toHaveProperty('title')
      expect(result[1]).toHaveProperty('content')
      expect(result[1]).toHaveProperty('expirationDate')
      expect(typeof result[1].title).toBe('string')
      expect(typeof result[1].content).toBe('string')
    })

    it('should list all messages with filters', async () => {
      const query: QueryUtilsDto = {
        limit: 1,
        offset: 1,
        startDate: null,
        endDate: null
      }

      const messages = [
        {
          id: 1,
          title: 'title text',
          content: 'content text',
          expirationDate: new Date().toISOString()
        }
      ]

      mockModel.findAll.mockReturnValue(messages)
      const result = await service.findAll(query, userId)

      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('title')
      expect(result[0]).toHaveProperty('content')
      expect(result[0]).toHaveProperty('expirationDate')
      expect(typeof result[0].title).toBe('string')
      expect(typeof result[0].content).toBe('string')
    })

    it('should search messages with filters', async () => {
      const query: MessageBoardsWithFilterRequestDto = {
        limit: '1',
        offset: '1',
        expirationDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        profiles: '1',
        orderBy: '1',
        title: '1'
      }

      const messages = [
        {
          id: 1,
          title: 'title text',
          content: 'content text',
          expirationDate: new Date().toISOString()
        }
      ]

      const userProfiles = {
        data: [1, 2, 3]
      }

      jest
        .spyOn(usersService, 'getUserProfiles')
        .mockResolvedValue(userProfiles)

      mockModel.findAll.mockReturnValue(messages)
      const result = await service.search(query, 1)

      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('title')
      expect(result[0]).toHaveProperty('content')
      expect(result[0]).toHaveProperty('expirationDate')
      expect(typeof result[0].title).toBe('string')
      expect(typeof result[0].content).toBe('string')
    })

    it('should search messages with filters but has no result', async () => {
      const query: MessageBoardsWithFilterRequestDto = {}

      const userProfiles = {
        data: []
      }

      jest
        .spyOn(usersService, 'getUserProfiles')
        .mockResolvedValue(userProfiles)

      mockModel.findAll.mockReturnValue([])
      const result = await service.search(query, 1)
      expect(result).toHaveLength(0)
    })

    it('should create a message, commit operation and return the new message ID', async () => {
      const value = { id: 1, get: jest.fn() }
      mockModel.create.mockReturnValue(value)

      const result = await service.create(createMessage, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBe(1)
    })

    it('should create a message, with no files saved', async () => {
      const value = { id: 1, get: jest.fn() }
      const files = [
        {
          fieldname: '',
          originalname: '',
          encoding: null,
          mimetype: null,
          size: 1,
          stream: null,
          destination: '',
          filename: '',
          path: '',
          buffer: null
        }
      ]

      mockModel.create.mockReturnValue(value)
      jest.spyOn(filesService, 'uploadMany').mockResolvedValue([])

      const result = await service.create({ ...createMessage, files }, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBe(1)
    })

    it('should create a message with files', async () => {
      const value = { id: 1, get: jest.fn() }
      const files = [
        {
          fieldname: '',
          originalname: '',
          encoding: null,
          mimetype: null,
          size: 1,
          stream: null,
          destination: '',
          filename: '',
          path: '',
          buffer: null
        }
      ]

      mockModel.create.mockReturnValue(value)

      jest
        .spyOn(filesService, 'uploadMany')
        .mockImplementationOnce(() => Promise.resolve([1]))

      const result = await service.create(
        { ...createMessage, files, profiles: '' },
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

    it('should throw an error on create', async () => {
      let error = null

      mockModel.create.mockRejectedValueOnce(new Error())

      try {
        await service.create(createMessage, userId)
      } catch (err) {
        error = err
      }
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
      expect(transaction.commit()).toBeTruthy()
      expect(error).toBeInstanceOf(InternalServerErrorException)
    })

    it('should update a message, commit operation and return a updated array', async () => {
      const files = [
        {
          fieldname: '',
          originalname: '',
          encoding: null,
          mimetype: null,
          size: 1,
          stream: null,
          destination: '',
          filename: '',
          path: '',
          buffer: null
        }
      ]

      const value = { ...createMessage, files, id: userId }

      jest
        .spyOn(filesService, 'uploadMany')
        .mockImplementationOnce(() => Promise.resolve([1]))
      mockModel.findByPk.mockReturnValue({
        ...value,
        get: jest.fn(),
        reload: jest.fn(() => updateMessage)
      })
      mockModel.create.mockReturnValueOnce({ id: 1 })

      await service.update(1, value, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
    })

    it('should update a message with no files and profiles', async () => {
      const value = { ...createMessage, profiles: '', id: userId }

      jest
        .spyOn(filesService, 'uploadMany')
        .mockImplementationOnce(() => Promise.resolve([1]))
      mockModel.findByPk.mockReturnValue({
        ...value,
        get: jest.fn(),
        reload: jest.fn(() => updateMessage)
      })
      mockModel.create.mockReturnValueOnce({ id: 1 })

      await service.update(1, value, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
    })

    it('should update a message with profile already up to date', async () => {
      const files = [
        {
          fieldname: '',
          originalname: '',
          encoding: null,
          mimetype: null,
          size: 1,
          stream: null,
          destination: '',
          filename: '',
          path: '',
          buffer: null
        }
      ]

      const value = { ...createMessage, files, profiles: '1', id: userId }

      jest.spyOn(filesService, 'uploadMany').mockResolvedValue([])
      mockModel.findByPk.mockReturnValue({
        ...value,
        get: jest.fn(),
        reload: jest.fn(() => updateMessage)
      })
      mockModel.create.mockReturnValueOnce({ id: 1 })
      mockModel.findAll.mockReturnValueOnce([{ id: 1 }])

      await service.update(1, value, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
    })

    it('should NOT update a message: not found', async () => {
      const value = { id: userId, ...createMessage }
      let error = null

      mockModel.findByPk.mockReturnValue(undefined)

      try {
        await service.update(1, value, userId)
      } catch (err) {
        error = err
      }

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
      expect(error).toBeInstanceOf(BadRequestException)
    })

    it('should delete a message and commit the operation', async () => {
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

    it('should NOT delete an message that does not exists', async () => {
      const messageId = 0
      const transaction = DatabaseProviderMock.useFactory().transaction()
      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      mockModel.findByPk.mockReturnValue(null)

      try {
        await service.delete(messageId, userId)
      } catch (error) {
        expect(error.message).toEqual('Recado não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should find by pk', async () => {
      const id = 1
      const message = {
        id,
        title: 'title text',
        content: 'content text',
        expirationDate: new Date().toISOString()
      }

      mockModel.findOne.mockReturnValue(message)
      const result = await service.findByPk(id, userId)

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('content')
      expect(result).toHaveProperty('expirationDate')
      expect(typeof result.title).toBe('string')
      expect(typeof result.content).toBe('string')
    })

    it('should delete an file from a message and commit the operation', async () => {
      const message = {
        id: 1,
        message_id: 1,
        file_id: 1,
        destroy: jest.fn(),
        get: jest.fn()
      }

      mockModel.findOne.mockReturnValue(message)
      mockModel.destroy.mockReturnValue(message.id)
      jest.spyOn(filesService, 'delete').mockResolvedValue()
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      const result = await service.deleteAttachment(
        message.id,
        message.file_id,
        userId
      )

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBeUndefined()
    })

    it('should NOT delete an file from a message that because it does not exist', async () => {
      const message = {
        id: 0,
        file_id: 0
      }
      const transaction = DatabaseProviderMock.useFactory().transaction()
      transaction.commit.mockReturnValue(false)
      transaction.rollback.mockReturnValue(true)

      mockModel.findOne.mockReturnValue(null)

      try {
        await service.deleteAttachment(message.id, message.file_id, userId)
      } catch (error) {
        expect(error.message).toEqual('Arquivo não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })
  })
})
