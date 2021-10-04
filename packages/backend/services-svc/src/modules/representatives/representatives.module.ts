import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../database/database.provider'
import { Address } from '../address/entities/address.entity'
import { File } from '../files/entities/file.entity'
import { WorkflowPerformed } from '../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedModule } from '../workflowsPerformed/workflowPerformed.module'
import { RepresentativeBankData } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeBankData.entity'
import { RepresentativeCommissionPercentage } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeCommissionPercentage.entity'
import { RepresentativeDocument } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeDocument.entity'
import { RepresentativeFinancial } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeFinancial.entity'
import { RepresentativeMaintenance } from '../workflowsPerformedTypes/representativeRegistration/entities/representativeMaintenance.entity'
import { WorkflowRepresentativeRegistration } from '../workflowsPerformedTypes/representativeRegistration/entities/workflowRepresentativeRegistration.entity'
import { RepresentativeRegistrationModule } from '../workflowsPerformedTypes/representativeRegistration/representativeRegistration.module'
import { RepresentativesController } from './representatives.controller'
import { RepresentativesService } from './representatives.service'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      Address,
      File,
      RepresentativeBankData,
      RepresentativeCommissionPercentage,
      RepresentativeDocument,
      RepresentativeFinancial,
      RepresentativeMaintenance,
      WorkflowPerformed,
      WorkflowRepresentativeRegistration
    ]),
    RepresentativeRegistrationModule,
    WorkflowPerformedModule
  ],
  controllers: [RepresentativesController],
  exports: [RepresentativesService],
  providers: [
    DatabaseProvider,
    RepresentativesService,
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
export class RepresentativesModule {}
