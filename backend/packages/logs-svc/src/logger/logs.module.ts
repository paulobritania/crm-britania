import { Module } from '@nestjs/common'

import { Log } from './entities/logs.entity'
import { LogsController } from './logs.controller'
import { LogsServiceImpl } from './logs.service'

@Module({
  imports: [],
  controllers: [LogsController],
  providers: [
    { provide: 'LogsService', useClass: LogsServiceImpl },
    { provide: 'LogsRepository', useValue: Log }
  ]
})
export class LogsModule {}
