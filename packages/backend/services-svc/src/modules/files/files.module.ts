import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { MulterModule } from '@nestjs/platform-express'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { File } from './entities/file.entity'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      File
    ]),
    MulterModule.register({
      dest: `${ process.env.UPLOAD_FOLDER }`
    })
  ],
  exports: [
    FilesService
  ],
  controllers: [FilesController],
  providers: [
    DatabaseProvider,
    FilesService,
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
export class FilesModule {}
