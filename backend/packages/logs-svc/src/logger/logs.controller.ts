import { Controller, Inject } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { Log } from './entities/logs.entity'
import { LogsService } from './logs.interface'

import { FindAllLogsQueryDto } from './dto/findAllLogsQuery.dto'

@Controller()
export class LogsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject('LogsService')
      private readonly logsService: LogsService
    ) {}

  // @Get()
  // getHello(): string {
  //   return this.logsService.getHello()
  // }

  @MessagePattern({ log: 'create' })
  async create(data: Log): Promise<void> {
    this.logsService.create(data)
  }
}
