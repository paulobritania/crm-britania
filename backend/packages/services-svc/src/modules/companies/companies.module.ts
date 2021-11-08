import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'
import { CompaniesBankAccount } from './entities/companiesBankAccount.entity'
import { Company } from './entities/company.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([Company, CompaniesBankAccount])
  ],
  controllers: [CompaniesController],
  providers: [DatabaseProvider, CompaniesService,
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
export class CompaniesModule {}
