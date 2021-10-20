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
import { Sequelize } from 'sequelize-typescript'

import { File } from '../files/entities/file.entity'
import { FileTypeDto } from './dto/fileType.dto'
import { Setting } from './entities/setting.entity'

@Injectable()
export class SettingsService {
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Setting) private settingModel: typeof Setting,
    @InjectModel(File) private fileModel: typeof File
  ) {}

  /**
   * Faz upload de uma imagem para a página de login e, caso já exista uma imagem,
   * remove e substitui a imagem anterior
   * @param file FileTypeDto
   * @param userId number
   */
  async uploadLoginImage(file: FileTypeDto, userId: number): Promise<Setting> {
    const transaction = await this.db.transaction()

    try {
      if (!file.originalname || !file.mimetype || !file.path)
        throw new BadRequestException('Imagem de login não informada')

      await this.deleteLoginImage(userId)

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
      const fileLog = {
        newData: newFile.get({ plain: true }),
        oldData: null,
        userId,
        httpVerb: 'create',
        table: 'files'
      }
      this.logsClient.send({ log: 'create' }, fileLog).toPromise()

      const data = {
        param: 'login_background',
        content: null,
        fileId: newFile.id
      }

      const setting = await this.settingModel.create(
        { ...data },
        { transaction }
      )
      const log = {
        newData: setting.get({ plain: true }),
        oldData: null,
        userId,
        httpVerb: 'create',
        table: 'settings'
      }

      this.logsClient.send({ log: 'create' }, log).toPromise()
      transaction.commit()
      return setting
    } catch (error) {
      transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar imagem de login'
      )
    }
  }

  /**
   * Busca um registro de settings referente a imagem de login no DB
   */
  async findLoginBG(): Promise<Setting> {
    const image = await this.settingModel.findOne({
      where: {
        param: 'login_background'
      },
      include: [
        {
          model: this.fileModel
        }
      ]
    })

    return image
  }

  /**
   * Deleta a imagem da página de login
   * @param userId number
   */
  async deleteLoginImage(userId: number): Promise<void> {
    const image = await this.findLoginBG()

    if (image) {
      await this.delete(image.id, image.fileId, userId)
      await this.deleteFolder(image.file.path)
    }
  }

  /**
   * Deleta um registro de settings no DB
   * @param id number
   * @param userId number
   */
  async delete(id: number, fileId: number, userId: number): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const setting = await this.settingModel.findByPk(id)

      if (!setting) throw new BadRequestException('Configuração não encontrada')

      const log = {
        oldData: setting.get({ plain: true }),
        userId,
        httpVerb: 'delete',
        table: 'settings'
      }

      await setting.destroy({ transaction })
      this.logsClient.send({ log: 'create' }, log).toPromise()

      const file = await this.fileModel.findByPk(fileId)

      if (!file) throw new BadRequestException('Arquivo não encontrado')

      const fileLog = {
        oldData: file.get({ plain: true }),
        userId,
        httpVerb: 'delete',
        table: 'files'
      }

      await file.destroy({ transaction })
      this.logsClient.send({ log: 'create' }, fileLog).toPromise()

      transaction.commit()
    } catch (error) {
      transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao remover configuração'
      )
    }
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
