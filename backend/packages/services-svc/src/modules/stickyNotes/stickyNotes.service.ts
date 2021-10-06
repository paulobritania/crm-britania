import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'

import { CreateStickyNoteDto } from './dto/createStickyNote.dto'
import { UpdateStickyNoteDto } from './dto/updateStickyNote.dto'
import { StickyNote } from './entities/stickyNote.entity'

@Injectable()
export class StickyNotesService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(StickyNote) private stickyNotesModel: typeof StickyNote
  ) {}

  /**
   * Cria um lembrete e retorna seu ID
   * @param data CreateStickyNoteDto
   * @param userId number
   */
  async create(data: CreateStickyNoteDto, userId: number): Promise<number> {
    const transaction = await this.db.transaction()

    try {
      const resource = await this.stickyNotesModel.create(
        { ...data, createdBy: userId },
        { transaction }
      )

      const log = {
        newData: resource.get({ plain: true }),
        oldData: null,
        userId,
        httpVerb: 'create',
        table: 'stickyNotes'
      }

      this.logsClient.send({ log: 'create' }, log).toPromise()
      transaction.commit()

      return resource.id
    } catch (error) {
      transaction.rollback()

      throw new InternalServerErrorException(
        'Ocorreu um erro ao criar o lembrete'
      )
    }
  }

  /**
   * Exclui um Lembrete
   * @param id number
   * @param userId number
   */
  async delete(id: number, userId: number): Promise<void> {
    const transaction = await this.db.transaction()

    try {
      const resource = await this.stickyNotesModel.findByPk(id)

      if (!resource) throw new BadRequestException('Lembrete não encontrado')

      const log = {
        oldData: resource.get({ plain: true }),
        userId,
        httpVerb: 'delete',
        table: 'stickyNotes'
      }

      await resource.destroy({ transaction })
      this.logsClient.send({ log: 'create' }, log).toPromise()

      transaction.commit()
    } catch (error) {
      transaction.rollback()
      if (error instanceof HttpException) throw error

      throw new InternalServerErrorException(
        'Ocorreu um erro ao remover o lembrete'
      )
    }
  }

  /**
   * Lista todos os lembretes por usuário
   * @param query
   * @param userId number
   */
  async findAll(query, userId: number): Promise<StickyNote[]> {
    const { limit, offset } = query
    let fullQuery = {}

    fullQuery = { ...fullQuery, where: { createdBy: userId } }

    if (limit) {
      fullQuery = { ...fullQuery, limit: parseInt(limit, 10) }
    }

    if (offset) {
      fullQuery = { ...fullQuery, offset: parseInt(offset, 10) }
    }

    return this.stickyNotesModel.findAll(fullQuery)
  }

  /**
   * Atualiza um lembrete e o retorna
   * @param id number
   * @param data UpdateUserDto
   * @param userId number
   */
  async update(
    id: number,
    data: UpdateStickyNoteDto,
    userId: number
  ): Promise<StickyNote> {
    let resource = null
    const transaction = await this.db.transaction()

    try {
      resource = await this.stickyNotesModel.findByPk(id)

      if (!resource) throw new BadRequestException('Lembrete não encontrado')

      await this.stickyNotesModel.update(
        { ...data, updatedBy: userId },
        { where: { id } }
      )

      const log = {
        newData: data,
        oldData: resource.get({ plain: true }),
        userId,
        httpVerb: 'patch',
        table: 'stickyNotes'
      }

      this.logsClient.send({ log: 'create' }, log).toPromise()
      resource = await resource.reload()
      transaction.commit()

      return resource
    } catch (error) {
      transaction.rollback()
      if (error instanceof HttpException) throw error
      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar o lembrete'
      )
    }
  }
}
