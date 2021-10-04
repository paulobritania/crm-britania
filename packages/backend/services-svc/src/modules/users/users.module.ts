import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
import { HierarchyModule } from '../hierarchy/hierarchy.module'
import { Profile } from '../profiles/entities/profile.entity'
import { RepresentativesModule } from '../representatives/representatives.module'
import { User } from './entities/user.entity'
import { UserProfile } from './entities/userProfile.entity'
import { UserRepresentativeCode } from './entities/userRepresentativeCode.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'


@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      User,
      UserRepresentativeCode,
      UserProfile,
      Profile,
      Hierarchy
    ]),
    RepresentativesModule,
    HierarchyModule
  ],
  exports: [
    UsersService
  ],
  controllers: [UsersController],
  providers: [
    DatabaseProvider,
    UsersService,
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
export class UsersModule {}
