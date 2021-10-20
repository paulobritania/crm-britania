import { Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getModelToken } from '@nestjs/sequelize'
import { Test, TestingModule } from '@nestjs/testing'
import * as fs from 'fs'

import DatabaseProviderMock from '../../database/database.provider.mock'
import { LogsService } from '../../utils/mocks/LogsService'
import { MockModel, IMockModel } from '../../utils/mocks/Model'
import { FileTypeDto } from '../settings/dto/fileType.dto'
import { File } from './entities/file.entity'
import { FilesService } from './files.service'

describe('FilesService', () => {
  let mockModel: IMockModel
  let LogsServiceProvider: Provider
  let service: FilesService
  let file1: FileTypeDto
  let file2: FileTypeDto
  let emptyNewFile: FileTypeDto

  const userId = 1

  beforeAll(() => {
    LogsServiceProvider = { ...LogsService }

    file1 = {
      fieldname: 'file',
      originalname: 'red.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: './files/16ec9a',
      filename: 'red.jpg',
      path: 'files/16ec9a/red.jpg',
      size: 21271
    }

    file2 = {
      fieldname: 'files',
      originalname: 'blue.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: './files/fc5eea',
      filename: 'red.jpg',
      path: 'files/fc5eea/red.jpg',
      size: 6988
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
        FilesService,
        {
          provide: getModelToken(File),
          useValue: mockModel
        },
        LogsServiceProvider
      ]
    }).compile()

    service = module.get<FilesService>(FilesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })


  describe('File CRUD operations', () => {
    it('should split file path informations', async () => {
      const { filename, folderpath } = await service.fileInfos(file1.path)
      expect(filename).toBe('red.jpg')
      expect(folderpath).toBe('files/16ec9a/')
    })

    it('should upload an file, commit operation and return the new file object', async () => {
      const value = { id: 1, get: jest.fn() }
      mockModel.create.mockReturnValue(value)

      await service.upload(file1, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
    })

    it('should NOT upload an file because his values isnt valid', async () => {
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.upload(emptyNewFile, userId)
      } catch (error) {
        expect(error.message).toEqual('Anexo não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should upload two files, commit operation and return array of ids', async () => {
      const files = [file1, file2]
      mockModel.create.mockReturnValueOnce({ id: 1, get: jest.fn() })
        .mockReturnValueOnce({ id: 2, get: jest.fn() })

      await service.uploadMany(files, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
    })

    it('should NOT upload files because his values isnt valid', async () => {
      const files = [emptyNewFile, emptyNewFile]
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.uploadMany({...files, get: jest.fn()}, userId)
      } catch (error) {
        expect(error.message).toEqual('Anexo não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should delete an file and commit the operation', async () => {
      const file = {
        id: 1,
        get: jest.fn(),
        destroy: jest.fn(),
        ...file1
      }
      mockModel.findByPk.mockReturnValue(file)
      mockModel.destroy.mockReturnValue(file.id)

      jest.spyOn(service, 'deleteFolder').mockImplementationOnce(() => Promise.resolve())

      const result = await service.delete(file.id, userId)
      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      expect(transaction.commit).toHaveBeenCalledTimes(1)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBeUndefined()
    })

    it('should remove a folder', async () => {
      const path = '/folder'

      jest.spyOn(service, 'fileInfos')
        .mockImplementationOnce(() => Promise.resolve({ folderpath: path }))
      jest.spyOn(fs, 'existsSync').mockReturnValue(true)
      const rmdirSpy = jest.spyOn(fs, 'rmdirSync').mockImplementation()

      await service.deleteFolder(path)

      expect(rmdirSpy).toHaveBeenCalledTimes(1)
    })

    it('should NOT remove a folder', async () => {
      const path = '/folder'

      jest.spyOn(service, 'fileInfos')
        .mockImplementationOnce(() => Promise.resolve({  }))
      jest.spyOn(fs, 'existsSync').mockReturnValue(false)
      const rmdirSpy = jest.spyOn(fs, 'rmdirSync').mockImplementation()

      await service.deleteFolder(path)

      expect(rmdirSpy).toHaveBeenCalledTimes(0)
    })

    it('should NOT delete an file because it does not exist', async () => {
      const value = { id: 1, destroy: jest.fn(), get: jest.fn() }
      mockModel.findByPk.mockReturnValue(null)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.delete(value.id, userId)
      } catch (error) {
        expect(error.message).toEqual('Arquivo não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(1)
    })

    it('should NOT delete a file when transaction is provided', async () => {
      const value = { id: 1, destroy: jest.fn(), get: jest.fn() }
      mockModel.findByPk.mockReturnValue(null)

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      try {
        await service.delete(value.id, userId, transaction as any)
      } catch (error) {
        expect(error.message).toEqual('Arquivo não encontrado')
      }

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
    })

    it('should delete a file and NOT commit the operation when a transaction is provided', async () => {
      const file = {
        id: 1,
        get: jest.fn(),
        destroy: jest.fn(),
        ...file1
      }
      mockModel.findByPk.mockReturnValue(file)
      mockModel.destroy.mockReturnValue(file.id)

      jest.spyOn(service, 'deleteFolder').mockImplementationOnce(() => Promise.resolve())

      const transaction = DatabaseProviderMock.useFactory().transaction()

      transaction.commit.mockReturnValue(true)
      transaction.rollback.mockReturnValue(true)

      const result = await service.delete(file.id, userId, transaction as any)

      expect(transaction.commit).toHaveBeenCalledTimes(0)
      expect(transaction.rollback).toHaveBeenCalledTimes(0)
      expect(transaction.commit()).toBeTruthy()
      expect(result).toBeUndefined()
    })

    it('should verify if an folder exists', async () => {
      const path = '/folder'

      jest.spyOn(service, 'fileInfos')
        .mockImplementationOnce(() => Promise.resolve({ folderpath: path }))

      const verifyFolderSpy = jest.spyOn(fs, 'existsSync').mockImplementation(() => true)
      const response = await service.verifyFolder(path)

      expect(verifyFolderSpy).toHaveBeenCalled()
      expect(response).toBeTruthy()
    })
  })
})
