/* eslint-disable @typescript-eslint/no-var-requires */
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { FindOptions, literal } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

import { isEmpty } from 'lodash'

import { PaginationQueryDto } from '../../utils/dto/paginationQuery.dto'
import { File } from '../files/entities/file.entity'
import { FilesService } from '../files/files.service'
import { Profile } from '../profiles/entities/profile.entity'
import { UserProfile } from '../users/entities/userProfile.entity'
import { UsersService } from '../users/users.service'
import { CreateMessageDto } from './dto/createMessage.dto'
import { MessageBoardsWithFilterRequestDto } from './dto/messageBoardsWithFilterRequestDto.dto'
import { UpdateMessageDto } from './dto/updateMessage.dto'
import { MessageProfilesAssoc } from './entities/messageAssocProfiles.entity'
import { MessageBoard } from './entities/messageBoard.entity'
import { MessageBoardsFile } from './entities/messageBoardFile.entity'

const moment = require('moment')
@Injectable()
export class MessageBoardsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @Inject(FilesService) private readonly filesService: FilesService,
    @Inject(UsersService) private readonly usersService: UsersService,
    @InjectModel(MessageBoard) private messageBoardModel: typeof MessageBoard,
    @InjectModel(MessageProfilesAssoc)
    private messageProfilesAssoc: typeof MessageProfilesAssoc,
    @InjectModel(MessageBoardsFile)
    private messageBoardsFileModel: typeof MessageBoardsFile
  ) {}

  /**
   * Cria uma mensagem e retorna seu ID
   * @param data CreateMessageDto
   * @param userId number
   */
  async create(data: CreateMessageDto, userId: number): Promise<number> {
    const transaction = await this.db.transaction()
    const { expirationDate, profiles } = data

    try {
      const createData = {
        ...data,
        createdBy: userId,
        expirationDate: moment(expirationDate).utc().endOf('day')
      }

      const resource = await this.messageBoardModel.create(createData, {
        transaction
      })

      const log = {
        newData: resource.get({ plain: true }),
        oldData: null,
        userId,
        httpVerb: 'create',
        table: 'messageBoards'
      }

      this.logsClient.send({ log: 'create' }, log).toPromise()

      if (profiles) {
        const splittedProfiles = profiles.split(',')
        if (!isEmpty(splittedProfiles)) {
          await Promise.all(
            splittedProfiles.map(async (profileId) => {
              const messageProfileAssocData = {
                messageId: resource.id,
                profileId
              }
              return this.messageProfilesAssoc.create(
                { ...messageProfileAssocData },
                { transaction }
              )
            })
          )
        }
      }

      if (data.files && data.files.length) {
        const ids = await this.filesService.uploadMany(data.files, userId)
        if (Array.isArray(ids) && ids.length) {
          await Promise.all(
            ids.map(async (id) => {
              const messageBoardsFilesData = {
                messageId: resource.id,
                fileId: id
              }
              return this.messageBoardsFileModel.create(
                messageBoardsFilesData,
                { transaction }
              )
            })
          )
        }
      }

      transaction.commit()
      return resource.id
    } catch (error) {
      transaction.rollback()
      if (error instanceof HttpException) throw error
      throw new InternalServerErrorException(
        'Ocorreu um erro ao cadastrar o recado'
      )
    }
  }

  /**
   * Exclui uma mensagem
   * @param id number
   * @param userId number
   */
  async delete(id: number, userId: number): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const resource = await this.messageBoardModel.findByPk(id)

      if (!resource) throw new BadRequestException('Recado não encontrado')

      const log = {
        oldData: resource.get({ plain: true }),
        userId,
        httpVerb: 'delete',
        table: 'messageBoards'
      }

      await resource.destroy({ transaction })
      this.logsClient.send({ log: 'create' }, log).toPromise()

      transaction.commit()
    } catch (error) {
      transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao remover o recado'
      )
    }
  }

  /**
   * Exclui um anexo de uma mensagem
   * @param id number
   * @param fileId number
   * @param userId number
   */
  async deleteAttachment(
    id: number,
    fileId: number,
    userId: number
  ): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const resource = await this.messageBoardsFileModel.findOne({
        where: {
          messageId: id,
          fileId
        }
      })

      if (!resource) {
        throw new BadRequestException('Arquivo não encontrado')
      }

      const log = {
        oldData: resource.get({ plain: true }),
        userId,
        httpVerb: 'delete',
        table: 'messageBoardsFiles'
      }

      await resource.destroy({ transaction })

      await this.filesService.delete(fileId, userId, transaction)

      this.logsClient.send({ log: 'create' }, log).toPromise()

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao remover um anexo'
      )
    }
  }

  /**
   * Lista todas as mensagens
   * @param query QueryUtilsDto
   */
  findAll(query: PaginationQueryDto, userId: number): Promise<MessageBoard[]> {
    const { limit, offset } = query
    const fullQuery: FindOptions = {
      where: {
        expirationDate: {
          $greaterOrEqualThen: new Date()
        }
      },
      ...(limit && { limit }),
      ...(offset && { offset }),
      include: [
        {
          model: MessageProfilesAssoc,
          attributes: [],
          required: true,
          include: [
            {
              model: Profile,
              attributes: [],
              required: true,
              include: [
                {
                  model: UserProfile,
                  attributes: [],
                  required: true,
                  where: { userId }
                }
              ]
            }
          ]
        }
      ]
    }

    return this.messageBoardModel.findAll(fullQuery)
  }

  /**
   * Filtra as mensagens por perfil e/ou ordena
   * @param query QueryUtilsDto
   */
  async search(
    query: MessageBoardsWithFilterRequestDto,
    userId: number
  ): Promise<MessageBoard[]> {
    const {
      limit,
      offset,
      profiles,
      orderBy,
      createdAt,
      expirationDate,
      title
    } = query

    const profileList = await this.usersService.getUserProfiles(userId)
    let userProfiles = !isEmpty(profileList.data) ? profileList.data : []

    if (profiles) {
      userProfiles = userProfiles.filter((userProfile) =>
        profiles.split(',').includes(userProfile.toString())
      )
    }

    if (isEmpty(userProfiles)) {
      return []
    }

    const createdAtPeriod = createdAt
      ? [
          moment(createdAt).utc().startOf('day'),
          moment(createdAt).utc().endOf('day')
        ]
      : null

    const expirationDatePeriod = expirationDate
      ? [
          moment(expirationDate).utc().startOf('day'),
          moment(expirationDate).utc().endOf('day')
        ]
      : null

    const where = {
      ...(title && { title: { $like: `%${ title }%` } }),
      ...(createdAt && { created_at: { $between: createdAtPeriod } }),
      ...(expirationDate
        ? { expiration_date: { $between: expirationDatePeriod } }
        : { expirationDate: { $greaterOrEqualThen: new Date() } }),
      id: {
        $in: literal(`(
          SELECT MB.id
          FROM message_boards MB
          INNER JOIN message_boards_profiles_assoc MBPA
            ON MBPA.message_id = MB.id
          WHERE MBPA.profile_id IN (${ userProfiles.join(',') })
          GROUP BY MB.id
        )`)
      }
    }

    const formattedQuery = {
      where,
      ...(offset && { offset: parseInt(offset, 10) }),
      ...(limit && { limit: parseInt(limit, 10) }),
      ...(orderBy && { orderBy: [orderBy, 'id'] }),
      include: [
        {
          model: MessageProfilesAssoc,
          as: 'messageProfile',
          attributes: ['id', 'profile_id'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    }

    return this.messageBoardModel.findAll(formattedQuery)
  }

  /**
   * Atualiza uma mensagem e o retorna
   * @param id number
   * @param data UpdateMessageDto
   * @param userId number
   */
  async update(
    id: number,
    data: UpdateMessageDto,
    userId: number
  ): Promise<MessageBoard> {
    let resource = null
    const transaction = await this.db.transaction()
    const { profiles, expirationDate } = data

    try {
      resource = await this.messageBoardModel.findByPk(id)

      if (!resource) throw new BadRequestException('Recado não encontrado')

      const updatedMessage = {
        ...data,
        updatedBy: userId,
        expirationDate: moment(expirationDate).endOf('day').utc()
      }

      await this.messageBoardModel.update(updatedMessage, { where: { id } })

      const log = {
        newData: data,
        oldData: resource.get({ plain: true }),
        userId,
        httpVerb: 'patch',
        table: 'messageBoards'
      }

      this.logsClient.send({ log: 'create' }, log).toPromise()
      resource = await resource.reload()

      if (profiles) {
        const splittedProfiles = profiles.split(',')
        if (!isEmpty(splittedProfiles)) {
          await this.messageProfilesAssoc.destroy({
            where: {
              messageId: id,
              profileId: { $notIn: splittedProfiles }
            }
          })

          await Promise.all(
            splittedProfiles.map(async (profileId) => {
              const result = await this.messageProfilesAssoc.findAll({
                where: {
                  messageId: id,
                  profileId
                }
              })

              if (isEmpty(result)) {
                await this.messageProfilesAssoc.create(
                  { messageId: id, profileId },
                  { transaction }
                )
              }
            })
          )
        }
      }

      if (data.files && data.files.length) {
        const ids = await this.filesService.uploadMany(data.files, userId)
        if (Array.isArray(ids) && ids.length) {
          await Promise.all(
            ids.map(async (fileId) => {
              const messageBoardsFilesData = {
                messageId: id,
                fileId
              }
              return this.messageBoardsFileModel.create(
                messageBoardsFilesData,
                { transaction }
              )
            })
          )
        }
      }
      transaction.commit()

      return resource
    } catch (error) {
      transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o recado'
      )
    }
  }

  findByPk(id: number, userId: number): Promise<MessageBoard> {
    return this.messageBoardModel.findOne({
      where: {
        id,
        $and: {
          id: {
            $in: literal(`(
            SELECT MB.id
            FROM message_boards MB
            INNER JOIN message_boards_profiles_assoc MBPA
              ON MBPA.message_id = MB.id
            INNER JOIN users_profiles UP
              ON UP.profile_id = MBPA.profile_id
            WHERE UP.user_id = ${ userId }
            )`)
          }
        }
      },
      include: [
        {
          model: MessageBoardsFile,
          include: [File]
        },
        {
          model: MessageProfilesAssoc,
          as: 'messageProfile',
          attributes: ['id'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    })
  }
}
