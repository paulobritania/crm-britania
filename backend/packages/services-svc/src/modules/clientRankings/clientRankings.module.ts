import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { ClientRankingsController } from './clientRankings.controller'
import { ClientRankingsService } from './clientRankings.service'
import { ClientRanking } from './entities/clientRanking.entity'
import { ClientRankingIndicator } from './entities/clientRankingIndicator.entity'
import { Ranking } from './entities/ranking.entity'
import { RankingIndicatorValue } from './entities/rankingIndicatorValue.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      ClientRanking,
      ClientRankingIndicator,
      Ranking,
      RankingIndicatorValue
    ])
  ],
  controllers: [ClientRankingsController],
  providers: [
    DatabaseProvider,
    ClientRankingsService,
    {
      provide: 'LOGS_SERVICE',
      inject: [ConfigService],
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.LOG_HOST,
            port: Number(process.env.LOG_PORT)
          }
        })
    }
  ],
  exports: [ClientRankingsService]
})
export class ClientRankingsModule {}
