import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { existsSync, rmdirSync } from 'fs'
import { Transaction } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { FileTypeDto } from '../settings/dto/fileType.dto'
import { File } from './entities/file.entity'

@Injectable()
export class FilesService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(File) private fileModel: typeof File
  ) {}

  /**
   * Faz upload de um arquivo e retorna as suas informações
   * @param file FileTypeDto
   * @param userId number
   */
  async upload(file: FileTypeDto, userId: number): Promise<File> {
    const transaction = await this.db.transaction()

    try {
      if (!file.originalname || !file.mimetype || !file.path) {
        throw new BadRequestException('Anexo não encontrado')
      }

      const fileData = {
        filename: file.originalname,
        contentType: file.mimetype,
        path: file.path,
        createdBy: userId
      }

      const newFile = await this.fileModel.create(
        { ...fileData },
        { transaction }
      )
      const log = {
        newData: newFile.get({ plain: true }),
        oldData: null,
        userId,
        httpVerb: 'create',
        table: 'files'
      }
      this.logsClient.send({ log: 'create' }, log).toPromise()
      transaction.commit()
      return newFile
    } catch (error) {
      transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao salvar o arquivo'
      )
    }
  }

  /**
   * Faz upload de um arquivo e retorna as suas informações
   * @param file FileTypeDto
   * @param userId number
   */
  async uploadMany(files: any, userId: number): Promise<any> {
    const transaction = await this.db.transaction()

    try {
      if (!Array.isArray(files) && !files.length) {
        throw new BadRequestException('Anexo não encontrado')
      }

      const newFiles = await Promise.all(
        files.map(async (file) => {
          const fileData = {
            filename: file.originalname,
            contentType: file.mimetype,
            path: file.path,
            createdBy: userId
          }
          const newFile = await this.fileModel.create(
            { ...fileData },
            { transaction }
          )

          const log = {
            newData: newFile.get({ plain: true }),
            oldData: null,
            userId,
            httpVerb: 'create',
            table: 'files'
          }
          this.logsClient.send({ log: 'create' }, log).toPromise()
          return newFile.id
        })
      )
      transaction.commit()
      return newFiles
    } catch (error) {
      transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao salvar arquivo(s)'
      )
    }
  }

  /**
   * Deleta um registro da tabela de files
   * @param id number
   * @param userId number
   * @param trx Transaction
   */
  async delete(id: number, userId: number, trx?: Transaction): Promise<void> {
    const transaction = trx || (await this.db.transaction())

    try {
      const file = await this.fileModel.findByPk(id)

      if (!file) {
        throw new BadRequestException('Arquivo não encontrado')
      }
      await this.deleteFolder(file.path)

      const log = {
        oldData: file.get({ plain: true }),
        userId,
        httpVerb: 'delete',
        table: 'files'
      }

      await file.destroy({ transaction })
      this.logsClient.send({ log: 'create' }, log).toPromise()
      if (!trx) await transaction.commit()
    } catch (error) {
      if (!trx) await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao remover arquivo'
      )
    }
  }

  /**
   * Retorna se um diretório ou arquivo existe
   * @param path string
   * @returns boolean
   */
  async verifyFolder(path: string): Promise<boolean> {
    const { folderpath } = await this.fileInfos(path)
    return existsSync(folderpath)
  }

  /**
   * Deleta o diretório que contém um arquivo
   * @param path string
   */
  async deleteFolder(path: string): Promise<void> {
    const { folderpath } = await this.fileInfos(path)

    if (existsSync(folderpath)) {
      rmdirSync(folderpath, { recursive: true })
    }
  }

  /**
   * Splita as informações de nome e diretório de um arquivo
   * @param path string
   */
  async fileInfos(path: string): Promise<any> {
    const splittedPath = path.split('/')
    const filename = splittedPath[splittedPath.length - 1]
    const folderpath = path.replace(filename, '')
    return { filename, folderpath }
  }
}
