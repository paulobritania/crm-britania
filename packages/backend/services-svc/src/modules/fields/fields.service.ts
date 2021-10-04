import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'

import { Field } from './entities/field.entity'

@Injectable()
export class FieldsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Field) private fieldModel: typeof Field
  ) {}

  /**
   * Lista todos os fields do accessId
   * @param accessId number
   */
  async findByAccessId(accessId: number): Promise<Field[]> {
    return this.fieldModel.findAll({
      where: {
        accessId
      }
    })
  }

}
