import { Inject, Injectable, InternalServerErrorException, HttpException } from '@nestjs/common'

import officegen from 'officegen'

import { InjectModel } from '@nestjs/sequelize'
import { Log } from './entities/logs.entity'
import { LogsService } from './logs.interface'
@Injectable()
export class LogsServiceImpl implements LogsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectModel(Log) private logs: typeof Log,
  ) {}

  async create(data: Log): Promise<void>{
    await this.logs.create(data)
  }
}
