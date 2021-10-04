import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { FilesModule } from '../files/files.module'
import { UsersModule } from '../users/users.module'
import { MessageProfilesAssoc } from './entities/messageAssocProfiles.entity'
import { MessageBoard } from './entities/messageBoard.entity'
import { MessageBoardsFile } from './entities/messageBoardFile.entity'
import { MessageBoardsController } from './messageBoards.controller'
import { MessageBoardsService } from './messageBoards.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      MessageBoard,
      MessageBoardsFile,
      MessageProfilesAssoc
    ]),
    FilesModule,
    UsersModule
  ],
  controllers: [MessageBoardsController],
  providers: [
    DatabaseProvider,
    MessageBoardsService,
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
export class MessageBoardsModule {}
