import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
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
  providers: [DatabaseProvider, CompaniesService]
})
export class CompaniesModule {}
