import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'

import { Access } from './entities/access.entity'

@Injectable()
export class AccessesService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('LOGS_SERVICE') private logsClient: ClientProxy,
    @Inject('SEQUELIZE') private db: Sequelize,
    @InjectModel(Access) private accessModel: typeof Access
  ) {}

  /**
   * Lista todas as visualizações
   */
  async findAll(): Promise<Access[]> {
    return this.accessModel.findAll()
  }

}
