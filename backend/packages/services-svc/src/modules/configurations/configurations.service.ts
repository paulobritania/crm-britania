/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BadRequestException,
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'
import { FindOptions } from 'sequelize/types'

import { File } from '../files/entities/file.entity'
import { FilesService } from '../files/files.service'
import { CreateDocumentDto } from './dtos/createDocument.dto'
import { FindAllDocumentsDto } from './dtos/findAllDocuments.dto'
import { UpdateDocumentDto } from './dtos/updateDocument.dto'
import { Document } from './entities/document.entity'

const moment = require('moment')

@Injectable()
export class ConfigurationsService {
  constructor(
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(FilesService) private readonly filesService: FilesService,
    @InjectModel(Document)
    private readonly documentModel: typeof Document
  ) {}

  /**
   * Retorna a lista de documentos
   * @param query FindAllDocumentsDto
   * @returns Document[]
   */
  async findAll(query: FindAllDocumentsDto): Promise<Document[]> {
    const queryOptions: FindOptions = {
      include: [
        {
          model: File,
          attributes: ['id', 'filename', 'path']
        }
      ],
      ...(query.offset && { offset: parseInt(query.offset, 10) }),
      ...(query.limit && { limit: parseInt(query.limit, 10) })
    }

    return this.documentModel.findAll(queryOptions)
  }

  /**
   * Busca um documento pelo alias e o retorna
   * @param alias string
   * @returns Document
   */
  async getDocument(alias: string): Promise<Document> {
    return this.documentModel.findOne({
      include: [{ model: File }],
      where: { alias }
    })
  }

  /**
   * Cria e retorna documento
   * @param data CreateDocumentDto
   * @param userId number
   * @returns Document
   */
  async createDocument(
    data: CreateDocumentDto,
    userId: number
  ): Promise<Document> {
    const transaction = await this.db.transaction()

    try {
      if (!data.file) {
        throw new BadRequestException('O arquivo é obrigatório')
      }

      const existentDocument = await this.documentModel.findOne({
        where: { alias: data.alias },
        transaction
      })

      if (existentDocument) {
        throw new ConflictException('Documento já cadastrado')
      }

      const uploadFile = await this.filesService.upload(data.file, userId)

      const documentData = {
        title: data.title,
        observation: data.observation,
        alias: data.alias,
        fileId: uploadFile.id,
        createdBy: userId,
        updatedBy: null
      }

      const document = await this.documentModel.create(documentData, {
        transaction
      })
      await transaction.commit()
      return document
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao cadastrar o documento'
      )
    }
  }

  /**
   * Atualiza um documento existente
   * @param data UpdateDocumentDto
   * @param userId number
   */
  async updateDocument(data: UpdateDocumentDto, userId: number): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const existentDocument = await this.documentModel.findOne({
        where: { alias: data.alias },
        include: [{ model: File }],
        transaction
      })

      if (!existentDocument) {
        throw new BadRequestException('Documento não encontrado')
      }

      let uploadFile = null
      if (data.file) {
        uploadFile = await this.filesService.upload(data.file, userId)
      }

      const documentData = {
        title: data.title,
        observation: data.observation,
        alias: data.alias,
        fileId: uploadFile ? uploadFile.id : existentDocument.file.id,
        updatedBy: userId,
        updatedAt: moment().utc()
      }

      await this.documentModel.update(documentData, {
        where: { alias: data.alias },
        transaction
      })

      if (uploadFile) {
        await this.filesService.delete(
          existentDocument.file.id,
          userId,
          transaction
        )
      }

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o documento'
      )
    }
  }

  /**
   * Deleta um documento pelo seu id
   * @param documentId number
   * @param userId number
   */
  async delete(documentId: number, userId: number): Promise<void> {
    const transaction = await this.db.transaction()
    try {
      const document = await this.documentModel.findByPk(documentId, {
        transaction
      })

      if (!document) {
        throw new BadRequestException('Documento não encontrado')
      }

      await document.destroy({ transaction })

      if (document.fileId) {
        await this.filesService.delete(document.fileId, userId, transaction)
      }

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao remover um documento'
      )
    }
  }
}
