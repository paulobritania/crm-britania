// import { HttpModule, Provider } from '@nestjs/common'
// import { ConfigModule } from '@nestjs/config'
// import { getModelToken } from '@nestjs/sequelize'
// import { Test, TestingModule } from '@nestjs/testing'

// import DatabaseProviderMock from '../../database/database.provider.mock'
// import { LogsService } from '../../utils/mocks/LogsService'
// import { MockModel, IMockModel } from '../../utils/mocks/Model'
// import { ClientRankingsService } from '../clientRankings/clientRankings.service'
// import { ClientRanking } from '../clientRankings/entities/clientRanking.entity'
// import { ClientRankingIndicator } from '../clientRankings/entities/clientRankingIndicator.entity'
// import { Ranking } from '../clientRankings/entities/ranking.entity'
// import { RankingIndicatorValue } from '../clientRankings/entities/rankingIndicatorValue.entity'
// import { ClientsService } from '../clients/clients.service'
// import { File } from '../files/entities/file.entity'
// import { FilesService } from '../files/files.service'
// import { Hierarchy } from '../hierarchy/entities/hierarchy.entity'
// import { HierarchyService } from '../hierarchy/hierarchy.service'
// import { UserRepresentativeCode } from '../users/entities/userRepresentativeCode.entity'
// import { Workflow } from '../workflows/entities/workflow.entity'
// import { WorkflowHistory } from '../workflows/entities/workflowHistory.entity'
// import { WorkflowTask } from '../workflows/entities/workflowTask.entity'
// import { WorkflowTaskCondition } from '../workflows/entities/workflowTaskCondition.entity'
// import { WorkflowTaskResponse } from '../workflows/entities/workflowTaskResponse.entity'
// import { WorkflowType } from '../workflows/entities/workflowType.entity'
// import { WorkflowTypeAccess } from '../workflows/entities/workflowTypesAccess.entity'
// import { WorkflowsService } from '../workflows/workflows.service'
// import { WorkflowPerformedResponse } from '../workflowsPerformed/entities/workflowPerformedResponses.entity'
// import { WorkflowPerformed } from '../workflowsPerformed/entities/workflowsPerformed.entity'
// import { WorkflowPerformedService } from '../workflowsPerformed/workflowPerformed.service'
// import { WorkflowClientRankingService } from '../workflowsPerformedTypes/clientRankings/clientRankings.service'
// import { WorkflowClientRanking } from '../workflowsPerformedTypes/clientRankings/entities/workflowClientRanking.entity'
// import { WorkflowClientRegisterService } from '../workflowsPerformedTypes/clientRegister/clientRegister.service'
// import { ClientAdditionalInformation } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformation.entity'
// import { ClientAdditionalInformationBankReference } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationBankReference.entity'
// import { ClientAdditionalInformationCommercialReference } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationCommercialReference.entity'
// import { ClientAdditionalInformationCounter } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationCounter.entity'
// import { ClientAdditionalInformationCounterValue } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationCounterValue.entity'
// import { ClientAdditionalInformationParticipationCompany } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationParticipationCompany.entity'
// import { ClientAdditionalInformationRevenue } from '../workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationRevenue.entity'
// import { ClientCadastralCheck } from '../workflowsPerformedTypes/clientRegister/entitites/clientCadastralCheck.entity'
// import { ClientDocument } from '../workflowsPerformedTypes/clientRegister/entitites/clientDocument.entity'
// import { ClientDocumentBalance } from '../workflowsPerformedTypes/clientRegister/entitites/clientDocumentBalance.entity'
// import { ClientDocumentContractualAlteration } from '../workflowsPerformedTypes/clientRegister/entitites/clientDocumentContractualAlteration.entity'
// import { ClientDocumentGeneral } from '../workflowsPerformedTypes/clientRegister/entitites/clientDocumentGeneral.entity'
// import { ClientDocumentPre } from '../workflowsPerformedTypes/clientRegister/entitites/clientDocumentPre.entity'
// import { ClientFinancial } from '../workflowsPerformedTypes/clientRegister/entitites/clientFinancial.entity'
// import { ClientFiscalInformation } from '../workflowsPerformedTypes/clientRegister/entitites/clientFiscalInformation.entity'
// import { ClientFiscalParametrization } from '../workflowsPerformedTypes/clientRegister/entitites/clientFiscalParametrization.entity'
// import { ClientFiscalParametrizationCfop } from '../workflowsPerformedTypes/clientRegister/entitites/clientFiscalParametrizationCfop.entity'
// import { ClientParametrization } from '../workflowsPerformedTypes/clientRegister/entitites/clientParametrization.entity'
// import { ClientPriceList } from '../workflowsPerformedTypes/clientRegister/entitites/clientPriceList.entity'
// import { ClientRegistrationInformation } from '../workflowsPerformedTypes/clientRegister/entitites/clientRegistrationInformation.entity'
// import { WorkflowClientRegister } from '../workflowsPerformedTypes/clientRegister/entitites/workflowClientRegister'
// import { WorkflowRegisterClientPerformed } from '../workflowsPerformedTypes/clientRegister/entitites/workflowClientRegisterPerformed.entity'
// import { WorkflowClientUpdateService } from '../workflowsPerformedTypes/clientUpdate/clientUpdate.service'
// import { WorkflowClientUpdate } from '../workflowsPerformedTypes/clientUpdate/entities/workflowClientUpdate.entity'
// import { WorkflowClientUpdateAddress } from '../workflowsPerformedTypes/clientUpdate/entities/workflowClientUpdateAddress.entity'
// import { BuyersService } from './buyers.service'
// import { Buyer } from './entities/buyer.entity'
// import { BuyerAddress } from './entities/buyerAddress.entity'
// import { BuyerLineFamily } from './entities/buyerLineFamily.entity'

// describe('BuyersService', () => {
//   let mockModel: IMockModel
//   let LogsServiceProvider: Provider
//   let service: BuyersService

//   beforeAll(() => {
//     LogsServiceProvider = { ...LogsService }
//   })

//   beforeEach(async () => {
//     mockModel = MockModel()

//     const hierarchyModule = Test.createTestingModule({
//       imports: [ConfigModule.forRoot()],
//       providers: [
//         DatabaseProviderMock,
//         HierarchyService,
//         {
//           provide: getModelToken(Hierarchy),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(UserRepresentativeCode),
//           useValue: mockModel
//         },
//         LogsServiceProvider
//       ],
//       exports: [HierarchyService]
//     })

//     const fileModule = Test.createTestingModule({
//       imports: [ConfigModule.forRoot()],
//       providers: [
//         DatabaseProviderMock,
//         FilesService,
//         {
//           provide: getModelToken(File),
//           useValue: mockModel
//         },
//         LogsServiceProvider
//       ],
//       exports: [FilesService]
//     })

//     const workflowsModule = Test.createTestingModule({
//       imports: [ConfigModule.forRoot()],
//       providers: [
//         DatabaseProviderMock,
//         WorkflowsService,
//         {
//           provide: getModelToken(Workflow),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(WorkflowTask),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(WorkflowTaskCondition),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(WorkflowTaskResponse),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(WorkflowType),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(WorkflowTypeAccess),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(WorkflowHistory),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(Hierarchy),
//           useValue: mockModel
//         },
//         LogsServiceProvider
//       ],
//       exports: [WorkflowsService]
//     })

//     const workflowsPerformedModule = Test.createTestingModule({
//       imports: [ConfigModule.forRoot(), HttpModule, workflowsModule as any],
//       providers: [
//         DatabaseProviderMock,
//         WorkflowPerformedService,
//         {
//           provide: getModelToken(WorkflowPerformedResponse),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(WorkflowPerformed),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(Hierarchy),
//           useValue: mockModel
//         },
//         LogsServiceProvider
//       ],
//       exports: [WorkflowPerformedService]
//     })

//     const workflowClientUpdateModule = Test.createTestingModule({
//       imports: [
//         ConfigModule.forRoot(),
//         HttpModule,
//         workflowsPerformedModule as any
//       ],
//       providers: [
//         DatabaseProviderMock,
//         WorkflowClientUpdateService,
//         {
//           provide: getModelToken(WorkflowClientUpdate),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(WorkflowClientUpdateAddress),
//           useValue: mockModel
//         },
//         LogsServiceProvider
//       ],
//       exports: [WorkflowClientUpdateService]
//     })

//     const workflowClientRankingModule = Test.createTestingModule({
//       imports: [
//         ConfigModule.forRoot(),
//         HttpModule,
//         workflowsPerformedModule as any
//       ],
//       providers: [
//         DatabaseProviderMock,
//         WorkflowClientRankingService,
//         {
//           provide: getModelToken(WorkflowClientRanking),
//           useValue: mockModel
//         },
//         LogsServiceProvider
//       ],
//       exports: [WorkflowClientRankingService]
//     })

//     const workflowClientRegisterModule = Test.createTestingModule({
//       imports: [
//         ConfigModule.forRoot(),
//         HttpModule,
//         workflowsPerformedModule as any,
//         fileModule as any
//       ],
//       providers: [
//         DatabaseProviderMock,
//         WorkflowClientRegisterService,
//         {
//           provide: getModelToken(WorkflowClientUpdate),
//           useValue: mockModel
//         },
//         { provide: getModelToken(WorkflowClientRegister), useValue: mockModel },
//         {
//           provide: getModelToken(ClientAdditionalInformation),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(ClientAdditionalInformationRevenue),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(
//             ClientAdditionalInformationCommercialReference
//           ),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(ClientAdditionalInformationBankReference),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(ClientAdditionalInformationCounter),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(
//             ClientAdditionalInformationParticipationCompany
//           ),
//           useValue: mockModel
//         },
//         { provide: getModelToken(ClientCadastralCheck), useValue: mockModel },
//         { provide: getModelToken(ClientDocument), useValue: mockModel },
//         { provide: getModelToken(ClientDocumentBalance), useValue: mockModel },
//         {
//           provide: getModelToken(ClientDocumentContractualAlteration),
//           useValue: mockModel
//         },
//         { provide: getModelToken(ClientDocumentGeneral), useValue: mockModel },
//         { provide: getModelToken(ClientDocumentPre), useValue: mockModel },
//         { provide: getModelToken(ClientFinancial), useValue: mockModel },
//         {
//           provide: getModelToken(ClientFiscalInformation),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(ClientFiscalParametrization),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(ClientFiscalParametrizationCfop),
//           useValue: mockModel
//         },
//         { provide: getModelToken(ClientParametrization), useValue: mockModel },
//         { provide: getModelToken(ClientPriceList), useValue: mockModel },
//         {
//           provide: getModelToken(ClientRegistrationInformation),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(ClientAdditionalInformationCounterValue),
//           useValue: mockModel
//         },
//         { provide: getModelToken(WorkflowPerformed), useValue: mockModel },
//         {
//           provide: getModelToken(WorkflowRegisterClientPerformed),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(File),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(WorkflowTask),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(WorkflowTaskResponse),
//           useValue: mockModel
//         },
//         LogsServiceProvider
//       ],
//       exports: [WorkflowClientRegisterService]
//     })

//     const clientRankingModule = Test.createTestingModule({
//       imports: [ConfigModule.forRoot()],
//       providers: [
//         DatabaseProviderMock,
//         ClientRankingsService,
//         {
//           provide: getModelToken(Ranking),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(RankingIndicatorValue),
//           useValue: mockModel
//         },
//         LogsServiceProvider
//       ],
//       exports: [ClientRankingsService]
//     })

//     const clientsModule = Test.createTestingModule({
//       imports: [
//         ConfigModule.forRoot(),
//         HttpModule,
//         clientRankingModule as any,
//         workflowClientRegisterModule as any,
//         workflowClientRankingModule as any,
//         workflowClientUpdateModule as any,
//         workflowsPerformedModule as any,
//         hierarchyModule as any
//       ],
//       providers: [
//         DatabaseProviderMock,
//         ClientsService,
//         {
//           provide: getModelToken(ClientRanking),
//           useValue: mockModel
//         },
//         {
//           provide: getModelToken(ClientRankingIndicator),
//           useValue: mockModel
//         },
//         LogsServiceProvider
//       ],
//       exports: [ClientsService]
//     })

//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         HttpModule,
//         ConfigModule.forRoot(),
//         clientsModule as any,
//         hierarchyModule as any
//       ],
//       providers: [
//         DatabaseProviderMock,
//         BuyersService,
//         LogsServiceProvider,
//         { provide: getModelToken(Buyer), useValue: mockModel },
//         { provide: getModelToken(BuyerAddress), useValue: mockModel },
//         { provide: getModelToken(BuyerLineFamily), useValue: mockModel },
//         { provide: getModelToken(Hierarchy), useValue: mockModel }
//       ]
//     }).compile()

//     service = module.get<BuyersService>(BuyersService)
//   })

//   it('should be defined', () => {
//     console.log(service)
//     expect(1).toBe(1)
//   })
// })
