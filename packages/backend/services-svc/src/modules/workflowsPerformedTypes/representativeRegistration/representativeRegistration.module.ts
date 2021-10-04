import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../../database/database.provider'
import { Address } from '../../address/entities/address.entity'
import { FilesModule } from '../../files/files.module'
import { WorkflowPerformed } from '../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedModule } from '../../workflowsPerformed/workflowPerformed.module'
import { RepresentativeBankData } from './entities/representativeBankData.entity'
import { RepresentativeCommissionPercentage } from './entities/representativeCommissionPercentage.entity'
import { RepresentativeDocument } from './entities/representativeDocument.entity'
import { RepresentativeFinancial } from './entities/representativeFinancial.entity'
import { RepresentativeMaintenance } from './entities/representativeMaintenance.entity'
import { WorkflowRepresentativeRegistrationPerformed } from './entities/worfklowRepresentativeRegistrationPerformed.entity'
import { WorkflowRepresentativeRegistration } from './entities/workflowRepresentativeRegistration.entity'
import { RepresentativeRegistrationService } from './representativeRegistration.service'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      Address,
      RepresentativeBankData,
      RepresentativeCommissionPercentage,
      RepresentativeDocument,
      RepresentativeFinancial,
      RepresentativeMaintenance,
      WorkflowPerformed,
      WorkflowRepresentativeRegistrationPerformed,
      WorkflowRepresentativeRegistration
    ]),
    WorkflowPerformedModule,
    FilesModule
  ],
  providers: [
    RepresentativeRegistrationService,
    DatabaseProvider,
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
  controllers: [],
  exports: [RepresentativeRegistrationService]
})
export class RepresentativeRegistrationModule {}
