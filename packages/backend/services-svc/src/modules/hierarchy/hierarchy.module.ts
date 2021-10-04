import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { UserRepresentativeCode } from '../users/entities/userRepresentativeCode.entity'
import { Hierarchy } from './entities/hierarchy.entity'
import { HierarchyController } from './hierarchy.controller'
import { HierarchyService } from './hierarchy.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([Hierarchy, UserRepresentativeCode])
  ],
  controllers: [HierarchyController],
  providers: [
    DatabaseProvider,
    HierarchyService,
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
  exports: [HierarchyService]
})
export class HierarchyModule {}
