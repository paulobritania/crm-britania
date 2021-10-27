import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { Access } from '../accesses/entities/access.entity'
import { Field } from '../fields/entities/field.entity'
import { Permission } from '../permissions/entities/permission.entity'
import { User } from '../users/entities/user.entity'
import { UserProfile } from '../users/entities/userProfile.entity'
import { Profile } from './entities/profile.entity'
import { ProfileAccess } from './entities/profileAccess.entity'
import { ProfileAccessException } from './entities/profileAccessException.entity'
import { ProfileMicro } from './entities/profileMicro.entity'
import { ProfilePermission } from './entities/profilePermission.entity'
import { ProfilesController } from './profiles.controller'
import { ProfilesService } from './profiles.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      Access,
      Field,
      Permission,
      ProfileAccess,
      ProfileAccessException,
      ProfileMicro,
      ProfilePermission,
      UserProfile,
      Profile,
      User
    ])
  ],
  controllers: [ProfilesController],
  providers: [
    DatabaseProvider,
    ProfilesService,
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
export class ProfilesModule {}
