import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { MulterModule } from '@nestjs/platform-express'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { File } from '../files/entities/file.entity'
import { Setting } from './entities/setting.entity'
import { SettingsController } from './settings.controller'
import { SettingsService } from './settings.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      Setting,
      File
    ]),
    MulterModule.register({
      dest: `${ process.env.UPLOAD_FOLDER }`
    })
  ],
  controllers: [SettingsController],
  providers: [
    DatabaseProvider,
    SettingsService,
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
export class SettingsModule {}
