import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'

import { DatabaseProvider } from '../../database/database.provider'
import { BanksController } from './banks.controller'
import { BanksService } from './banks.service'
import { Bank } from './entities/bank.entity'

@Module({
  imports: [ConfigModule.forRoot(), SequelizeModule.forFeature([Bank])],
  controllers: [BanksController],
  providers: [DatabaseProvider, BanksService]
})
export class BanksModule {}
