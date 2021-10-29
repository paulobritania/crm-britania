import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { DatabaseProvider } from '../../database/database.provider'
import { BanksController } from './banks.controller'
import { BanksService } from './banks.service'
import { LogsService } from '../logs/logs.service'
import { Bank } from './entities/bank.entity'
import { Log } from '../logs/entities/log.entity'
import { LogsModule } from '../logs/logs.module'

@Module({
  imports: [ConfigModule.forRoot(), SequelizeModule.forFeature([Bank, Log]), LogsModule ],
  controllers: [BanksController],
  providers: [DatabaseProvider, BanksService, LogsService]
})
export class BanksModule {}
