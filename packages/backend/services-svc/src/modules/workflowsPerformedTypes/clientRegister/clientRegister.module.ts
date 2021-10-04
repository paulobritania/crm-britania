import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { SequelizeModule } from '@nestjs/sequelize'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from '../../../database/database.provider'
import { File } from '../../files/entities/file.entity'
import { FilesModule } from '../../files/files.module'
import { WorkflowTask } from '../../workflows/entities/workflowTask.entity'
import { WorkflowTaskResponse } from '../../workflows/entities/workflowTaskResponse.entity'
import { WorkflowPerformed } from '../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowPerformedModule } from '../../workflowsPerformed/workflowPerformed.module'
import { WorkflowClientRegisterService } from './clientRegister.service'
import { ClientAdditionalInformation } from './entitites/clientAdditionalInformation.entity'
import { ClientAdditionalInformationBankReference } from './entitites/clientAdditionalInformationBankReference.entity'
import { ClientAdditionalInformationCommercialReference } from './entitites/clientAdditionalInformationCommercialReference.entity'
import { ClientAdditionalInformationCounter } from './entitites/clientAdditionalInformationCounter.entity'
import { ClientAdditionalInformationCounterValue } from './entitites/clientAdditionalInformationCounterValue.entity'
import { ClientAdditionalInformationParticipationCompany } from './entitites/clientAdditionalInformationParticipationCompany.entity'
import { ClientAdditionalInformationRevenue } from './entitites/clientAdditionalInformationRevenue.entity'
import { ClientCadastralCheck } from './entitites/clientCadastralCheck.entity'
import { ClientDocument } from './entitites/clientDocument.entity'
import { ClientDocumentBalance } from './entitites/clientDocumentBalance.entity'
import { ClientDocumentContractualAlteration } from './entitites/clientDocumentContractualAlteration.entity'
import { ClientDocumentGeneral } from './entitites/clientDocumentGeneral.entity'
import { ClientDocumentPre } from './entitites/clientDocumentPre.entity'
import { ClientFinancial } from './entitites/clientFinancial.entity'
import { ClientFiscalInformation } from './entitites/clientFiscalInformation.entity'
import { ClientFiscalParametrization } from './entitites/clientFiscalParametrization.entity'
import { ClientFiscalParametrizationCfop } from './entitites/clientFiscalParametrizationCfop.entity'
import { ClientParametrization } from './entitites/clientParametrization.entity'
import { ClientPriceList } from './entitites/clientPriceList.entity'
import { ClientRegistrationInformation } from './entitites/clientRegistrationInformation.entity'
import { WorkflowClientRegister } from './entitites/workflowClientRegister'
import { WorkflowRegisterClientPerformed } from './entitites/workflowClientRegisterPerformed.entity'
@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(),
    SequelizeModule.forFeature([
      WorkflowClientRegister,
      ClientAdditionalInformation,
      ClientAdditionalInformationRevenue,
      ClientAdditionalInformationCommercialReference,
      ClientAdditionalInformationBankReference,
      ClientAdditionalInformationCounter,
      ClientAdditionalInformationParticipationCompany,
      ClientCadastralCheck,
      ClientDocument,
      ClientDocumentBalance,
      ClientDocumentContractualAlteration,
      ClientDocumentGeneral,
      ClientDocumentPre,
      ClientFinancial,
      ClientFiscalInformation,
      ClientFiscalParametrization,
      ClientFiscalParametrizationCfop,
      ClientParametrization,
      ClientPriceList,
      ClientRegistrationInformation,
      ClientAdditionalInformationCounterValue,
      WorkflowPerformed,
      WorkflowRegisterClientPerformed,
      File,
      WorkflowTask,
      WorkflowTaskResponse
    ]),
    FilesModule,
    WorkflowPerformedModule
  ],
  providers: [
    DatabaseProvider,
    WorkflowClientRegisterService,
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
  exports: [WorkflowClientRegisterService]
})
export class ClientRegisterModule {}
