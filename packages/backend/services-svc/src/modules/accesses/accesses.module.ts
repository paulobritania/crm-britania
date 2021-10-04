import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { AccessesController } from './accesses.controller'
import { AccessesService } from './accesses.service'
import { Access } from './entities/access.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      Access
    ])
  ],
  controllers: [AccessesController],
  providers: [
    DatabaseProvider,
    AccessesService,
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
  ]
})
export class AccessesModule {}
