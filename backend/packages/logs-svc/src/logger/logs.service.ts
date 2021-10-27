import { Inject, Injectable } from '@nestjs/common'

import { Log } from '../entities/logs.entity'
import { LogsService } from './logs.interface'
@Injectable()
export class LogsServiceImpl implements LogsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('LogsRepository') private readonly logsRepo: typeof Log
  ) {}

  async create(data: Log): Promise<void>{
    await this.logsRepo.create(data)
  }
}
