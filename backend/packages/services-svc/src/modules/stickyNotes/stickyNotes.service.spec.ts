import { BadRequestException, InternalServerErrorException, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { CreateStickyNoteDto } from './dto/createStickyNote.dto'
import { UpdateStickyNoteDto } from './dto/updateStickyNote.dto'
import { StickyNote } from './entities/stickyNote.entity'
import { StickyNotesService } from './stickyNotes.service'

describe('StickyNotesService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: StickyNotesService
  let createStickyNote: CreateStickyNoteDto
  let updateStickyNote: UpdateStickyNoteDto

  const userId = 1

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }

    createStickyNote = {
      content: 'content text',
      createdBy: 1
    }
  })

  beforeEach(async () => {
    mockModel = MockModel()
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot()
      ],
      providers: [
        DatabaseProviderMock,
        StickyNotesService,
        {
          provide: getModelToken(StickyNote),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<StickyNotesService>(StickyNotesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Message board CRUD operations', () => {
    it('should list all messages', async () => {
      const query = {
        limit: null,
        offset: null
      }

      const messages = [{
        id: 1,
        content: 'content text'
      }, {
        id: 2,
        content: 'Content text test'
      }]

      mockModel.findAll.mockReturnValue(messages)
      const result = await service.findAll(query, userId)

      expect(result[1]).toHaveProperty('id')
      expect(result[1]).toHaveProperty('content')
      expect(typeof result[1].content).toBe('string')
    })

    it('should list all messages with filters', async () => {
      const query = {
        limit: 1,
        offset: 1
      }

      const messages = [{
        id: 2,
        content: 'content text'
      }]

      mockModel.findAll.mockReturnValue(messages)
      const result = await service.findAll(query, userId)

      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('content')
      expect(typeof result[0].content).toBe('string')
    })

    it('should create an sticky note, commit operation and return the new message ID', async () => {
      const value = { id: 1, get: jest.fn() }
      mockModel.create.mockReturnValue(value)

      const result = await service.create(createStickyNote, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBe(1)
    })

    it('should NOT create on failure', async () => {
      let error = null

      mockModel.create.mockRejectedValue(new Error())

      try {
        await service.create(createStickyNote, userId)
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
      expect(error).toBeInstanceOf(InternalServerErrorException)
    })

    it('should update an sticky note, commit operation and return an updated array', async () => {
      const value = { id: userId, ...createStickyNote }

      mockModel.findByPk.mockReturnValue({ ...value, get: jest.fn(), reload: jest.fn(() => updateStickyNote) })
      await service.update(1, value, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
    })

    it('should NOT update an sticky note: not found', async () => {
      const value = { id: userId, ...createStickyNote }
      let error = null

      mockModel.findByPk.mockReturnValue(null)
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
      expect(transaction.commit()).toBeTruthy()
      expect(error).not.toBeNull()
      expect(error).toBeInstanceOf(BadRequestException)
    })

    it('should delete an sticky note and commit the operation', async () => {
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

    it('should NOT delete an sticky note that does not exists', async () => {
      const transaction = DatabaseProviderMock.useFactory().transaction()
      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      mockModel.findByPk.mockReturnValue(null)

      try {
        await service.delete(1, userId)
      } catch (error) {
        expect(error.message).toEqual('Lembrete não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })
  })
})
