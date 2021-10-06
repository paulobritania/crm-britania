import { Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'
import * as fs from 'fs'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { MockEntity } from '../../utils/mocks/Entity'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { File } from '../files/entities/file.entity'
import { FileTypeDto } from './dto/fileType.dto'
import { Setting } from './entities/setting.entity'
import { SettingsService } from './settings.service'

describe('SettingsService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: SettingsService
  let newFile: FileTypeDto
  let emptyNewFile: FileTypeDto

  const userId = 1

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }

    newFile = {
      fieldname: 'file',
      originalname: 'red.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: './files/16ec9a',
      filename: 'red.jpg',
      path: 'files/16ec9a/red.jpg',
      size: 21271
    }
    emptyNewFile = {
      fieldname: null,
      originalname: null,
      encoding: null,
      mimetype: null,
      destination: null,
      filename: null,
      path: null,
      size: null
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
        SettingsService,
        {
          provide: getModelToken(Setting),
          useValue: mockModel
        }, {
          provide: getModelToken(File),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<SettingsService>(SettingsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Settings CRUD operations', () => {
    it('should upload an login image, commit operation and return the new setting object', async () => {
      const value = { id: 1, get: jest.fn() }
      mockModel.create.mockReturnValue(value)

      await service.uploadLoginImage(newFile, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
    })

    it('should NOT upload an login image because it does not exist', async () => {
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.uploadLoginImage(emptyNewFile, userId)
      } catch (error) {
        expect(error.message).toEqual('Imagem de login não informada')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should delete an setting and commit the operation', async () => {
      const value = { id: 1, destroy: jest.fn(), get: jest.fn() }
      mockModel.findByPk.mockReturnValue(value)
      mockModel.destroy.mockReturnValue(value.id)

      const result = await service.delete(value.id, value.id, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBeUndefined()
    })

    it('should NOT delete a setting because it does not exist', async () => {
      const value = { id: 1, destroy: jest.fn(), get: jest.fn() }
      mockModel.findByPk.mockReturnValue(null)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.delete(value.id, value.id, userId)
      } catch (error) {
        expect(error.message).toEqual('Configuração não encontrada')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should NOT delete a setting because file does not exist', async () => {
      const value = { id: 1, destroy: jest.fn(), get: jest.fn() }
      mockModel.findByPk.mockReturnValueOnce(value).mockReturnValueOnce(null)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.delete(value.id, value.id, userId)
      } catch (error) {
        expect(error.message).toEqual('Arquivo não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should split file path informations', async () => {
      const { filename, folderpath } = await service.fileInfos(newFile.path)
      expect(filename).toBe('red.jpg')
      expect(folderpath).toBe('files/16ec9a/')
    })

    it('sould delete login image', async () => {
      const file = MockEntity({
        id: 1,
        path: '',
        contentType: '',
        createdBy: 1,
        filename: '',
        user: null
      })

      const setting = MockEntity({
        id: 1,
        fileId: 1,
        content: '',
        param: '',
        file
      })

      jest.spyOn(service, 'findLoginBG').mockResolvedValue(setting)
      const deleteSpy = jest.spyOn(service, 'delete').mockImplementationOnce(() => Promise.resolve())
      const deleteFolderSpy = jest.spyOn(service, 'deleteFolder').mockImplementationOnce(() => Promise.resolve())

      await service.deleteLoginImage(userId)

      expect(deleteSpy).toHaveBeenCalledTimes(1)
      expect(deleteFolderSpy).toHaveBeenCalledTimes(1)
    })

    it('sould not delete login image: image not found', async () => {
      jest.spyOn(service, 'findLoginBG').mockResolvedValue(null)
      const deleteSpy = jest.spyOn(service, 'delete').mockImplementationOnce(() => Promise.resolve())
      const deleteFolderSpy = jest.spyOn(service, 'deleteFolder').mockImplementationOnce(() => Promise.resolve())

      await service.deleteLoginImage(userId)

      expect(deleteSpy).toHaveBeenCalledTimes(0)
      expect(deleteFolderSpy).toHaveBeenCalledTimes(0)
    })

    it('sould delete folder', async () => {
      jest.spyOn(service, 'fileInfos').mockResolvedValue({ folderpath: '/' })
      jest.spyOn(fs, 'existsSync').mockReturnValue(true)
      const fnSpy = jest.spyOn(fs, 'rmdirSync').mockImplementation()

      await service.deleteFolder('/')

      expect(fnSpy).toHaveBeenCalledTimes(1)
    })

    it('sould not delete folder', async () => {
      jest.spyOn(service, 'fileInfos').mockResolvedValue({ folderpath: '/' })
      jest.spyOn(fs, 'existsSync').mockReturnValue(false)
      const fnSpy = jest.spyOn(fs, 'rmdirSync').mockImplementation()

      await service.deleteFolder('/')

      expect(fnSpy).toHaveBeenCalledTimes(0)
    })
  })

})
