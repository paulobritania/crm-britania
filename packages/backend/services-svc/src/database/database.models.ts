import { Access } from '../modules/accesses/entities/access.entity'
import { Address } from '../modules/address/entities/address.entity'
import { Bank } from '../modules/banks/entities/bank.entity'
import { Buyer } from '../modules/buyers/entities/buyer.entity'
import { BuyerAddress } from '../modules/buyers/entities/buyerAddress.entity'
import { BuyerLineFamily } from '../modules/buyers/entities/buyerLineFamily.entity'
import { ClientRanking } from '../modules/clientRankings/entities/clientRanking.entity'
import { ClientRankingIndicator } from '../modules/clientRankings/entities/clientRankingIndicator.entity'
import { Ranking } from '../modules/clientRankings/entities/ranking.entity'
import { RankingIndicator } from '../modules/clientRankings/entities/rankingIndicator.entity'
import { RankingIndicatorValue } from '../modules/clientRankings/entities/rankingIndicatorValue.entity'
import { Company } from '../modules/companies/entities/company.entity'
import { Document } from '../modules/configurations/entities/document.entity'
import { Field } from '../modules/fields/entities/field.entity'
import { File } from '../modules/files/entities/file.entity'
import { Hierarchy } from '../modules/hierarchy/entities/hierarchy.entity'
import { MessageProfilesAssoc } from '../modules/messageBoards/entities/messageAssocProfiles.entity'
import { MessageBoard } from '../modules/messageBoards/entities/messageBoard.entity'
import { MessageBoardsFile } from '../modules/messageBoards/entities/messageBoardFile.entity'
import { Permission } from '../modules/permissions/entities/permission.entity'
import { Profile } from '../modules/profiles/entities/profile.entity'
import { ProfileAccess } from '../modules/profiles/entities/profileAccess.entity'
import { ProfileAccessException } from '../modules/profiles/entities/profileAccessException.entity'
import { ProfileMicro } from '../modules/profiles/entities/profileMicro.entity'
import { ProfilePermission } from '../modules/profiles/entities/profilePermission.entity'
import { Setting } from '../modules/settings/entities/setting.entity'
import { StickyNote } from '../modules/stickyNotes/entities/stickyNote.entity'
import { User } from '../modules/users/entities/user.entity'
import { UserProfile } from '../modules/users/entities/userProfile.entity'
import { UserRepresentativeCode } from '../modules/users/entities/userRepresentativeCode.entity'
import { Workflow } from '../modules/workflows/entities/workflow.entity'
import { WorkflowHistory } from '../modules/workflows/entities/workflowHistory.entity'
import { WorkflowTask } from '../modules/workflows/entities/workflowTask.entity'
import { WorkflowTaskCondition } from '../modules/workflows/entities/workflowTaskCondition.entity'
import { WorkflowTaskResponse } from '../modules/workflows/entities/workflowTaskResponse.entity'
import { WorkflowType } from '../modules/workflows/entities/workflowType.entity'
import { WorkflowTypeAccess } from '../modules/workflows/entities/workflowTypesAccess.entity'
import { WorkflowPerformedResponse } from '../modules/workflowsPerformed/entities/workflowPerformedResponses.entity'
import { WorkflowPerformed } from '../modules/workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowClientRanking } from '../modules/workflowsPerformedTypes/clientRankings/entities/workflowClientRanking.entity'
import { ClientAdditionalInformation } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformation.entity'
import { ClientAdditionalInformationBankReference } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationBankReference.entity'
import { ClientAdditionalInformationCommercialReference } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationCommercialReference.entity'
import { ClientAdditionalInformationCounter } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationCounter.entity'
import { ClientAdditionalInformationCounterValue } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationCounterValue.entity'
import { ClientAdditionalInformationParticipationCompany } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationParticipationCompany.entity'
import { ClientAdditionalInformationRevenue } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientAdditionalInformationRevenue.entity'
import { ClientCadastralCheck } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientCadastralCheck.entity'
import { ClientDocument } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientDocument.entity'
import { ClientDocumentBalance } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientDocumentBalance.entity'
import { ClientDocumentContractualAlteration } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientDocumentContractualAlteration.entity'
import { ClientDocumentGeneral } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientDocumentGeneral.entity'
import { ClientDocumentPre } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientDocumentPre.entity'
import { ClientFinancial } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientFinancial.entity'
import { ClientFiscalInformation } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientFiscalInformation.entity'
import { ClientFiscalParametrization } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientFiscalParametrization.entity'
import { ClientFiscalParametrizationCfop } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientFiscalParametrizationCfop.entity'
import { ClientParametrization } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientParametrization.entity'
import { ClientPriceList } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientPriceList.entity'
import { ClientRegistrationInformation } from '../modules/workflowsPerformedTypes/clientRegister/entitites/clientRegistrationInformation.entity'
import { WorkflowClientRegister } from '../modules/workflowsPerformedTypes/clientRegister/entitites/workflowClientRegister'
import { WorkflowRegisterClientPerformed } from '../modules/workflowsPerformedTypes/clientRegister/entitites/workflowClientRegisterPerformed.entity'
import { WorkflowClientUpdate } from '../modules/workflowsPerformedTypes/clientUpdate/entities/workflowClientUpdate.entity'
import { WorkflowClientUpdateAddress } from '../modules/workflowsPerformedTypes/clientUpdate/entities/workflowClientUpdateAddress.entity'
import { WorkflowFan } from '../modules/workflowsPerformedTypes/fan/entities/workflowFan.entity'
import { WorkflowFanDocument } from '../modules/workflowsPerformedTypes/fan/entities/workflowFanDocument.entity'
import { WorkflowFanFamily } from '../modules/workflowsPerformedTypes/fan/entities/workflowFanFamily.entity'
import { WorkflowFanFamilyException } from '../modules/workflowsPerformedTypes/fan/entities/workflowFanFamilyException.entity'
import { WorkflowFanGoalAchivement } from '../modules/workflowsPerformedTypes/fan/entities/workflowFanGoalAchivement.entity'
import { WorkflowFanLine } from '../modules/workflowsPerformedTypes/fan/entities/workflowFanLine.entity'
import { WorkflowFanLineException } from '../modules/workflowsPerformedTypes/fan/entities/workflowFanLineException.entity'
import { WorkflowFanNegotiatedFund } from '../modules/workflowsPerformedTypes/fan/entities/workflowFanNegotiatedFund.entity'
import { WorkflowFanPercentage } from '../modules/workflowsPerformedTypes/fan/entities/workflowFanPercentage.entity'
import { WorkflowFanPerformed } from '../modules/workflowsPerformedTypes/fan/entities/workflowFanPerformed.entity'
import { RepresentativeBankData } from '../modules/workflowsPerformedTypes/representativeRegistration/entities/representativeBankData.entity'
import { RepresentativeCommissionPercentage } from '../modules/workflowsPerformedTypes/representativeRegistration/entities/representativeCommissionPercentage.entity'
import { RepresentativeDocument } from '../modules/workflowsPerformedTypes/representativeRegistration/entities/representativeDocument.entity'
import { RepresentativeFinancial } from '../modules/workflowsPerformedTypes/representativeRegistration/entities/representativeFinancial.entity'
import { RepresentativeMaintenance } from '../modules/workflowsPerformedTypes/representativeRegistration/entities/representativeMaintenance.entity'
import { WorkflowRepresentativeRegistrationPerformed } from '../modules/workflowsPerformedTypes/representativeRegistration/entities/worfklowRepresentativeRegistrationPerformed.entity'
import { WorkflowRepresentativeRegistration } from '../modules/workflowsPerformedTypes/representativeRegistration/entities/workflowRepresentativeRegistration.entity'
import { WorkflowVpc } from '../modules/workflowsPerformedTypes/vpc/entities/workflowVpc.entity'
import { WorkflowVpcAttachment } from '../modules/workflowsPerformedTypes/vpc/entities/workflowVpcAttachments.entity'
import { WorkflowVpcLineFamily } from '../modules/workflowsPerformedTypes/vpc/entities/workflowVpcLineFamily.entity'
import { WorkflowVpcNd } from '../modules/workflowsPerformedTypes/vpc/entities/workflowVpcNd.entity'
import { WorkflowVpcPerformed } from '../modules/workflowsPerformedTypes/vpc/entities/workflowVpcPerformed.entity'
import { WorkflowVpcProduct } from '../modules/workflowsPerformedTypes/vpc/entities/workflowVpcProduct.entity'
import { WorkflowVpcRequest } from '../modules/workflowsPerformedTypes/vpc/entities/workflowVpcRequests.entity'
import { WorkflowVpcStatus } from '../modules/workflowsPerformedTypes/vpc/entities/workflowVpcStatus.entity'

export const DatabaseModelList = [
  Access,
  Address,
  Ranking,
  RankingIndicator,
  RankingIndicatorValue,
  Company,
  Document,
  Field,
  File,
  MessageBoard,
  Permission,
  ProfileAccess,
  ProfileAccessException,
  ProfileMicro,
  ProfilePermission,
  Profile,
  Setting,
  StickyNote,
  User,
  UserRepresentativeCode,
  UserProfile,
  MessageBoardsFile,
  MessageProfilesAssoc,
  Workflow,
  WorkflowTask,
  WorkflowTaskCondition,
  WorkflowTaskResponse,
  WorkflowType,
  WorkflowHistory,
  WorkflowTypeAccess,
  Buyer,
  BuyerAddress,
  BuyerLineFamily,
  Hierarchy,
  WorkflowPerformedResponse,
  WorkflowPerformed,
  WorkflowClientRanking,
  WorkflowClientUpdate,
  WorkflowClientUpdateAddress,
  ClientRankingIndicator,
  ClientRanking,
  RepresentativeBankData,
  RepresentativeCommissionPercentage,
  RepresentativeDocument,
  RepresentativeFinancial,
  RepresentativeMaintenance,
  WorkflowRepresentativeRegistrationPerformed,
  WorkflowRepresentativeRegistration,
  WorkflowVpc,
  WorkflowVpcAttachment,
  WorkflowVpcLineFamily,
  WorkflowVpcNd,
  WorkflowVpcProduct,
  WorkflowVpcRequest,
  WorkflowVpcPerformed,
  ClientAdditionalInformation,
  ClientAdditionalInformationRevenue,
  ClientAdditionalInformationCommercialReference,
  ClientAdditionalInformationBankReference,
  ClientAdditionalInformationCounter,
  ClientAdditionalInformationCounterValue,
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
  WorkflowClientRegister,
  WorkflowRegisterClientPerformed,
  WorkflowFan,
  WorkflowFanGoalAchivement,
  WorkflowFanNegotiatedFund,
  WorkflowFanPercentage,
  WorkflowFanPerformed,
  WorkflowFanDocument,
  WorkflowFanFamilyException,
  WorkflowFanFamily,
  WorkflowFanLine,
  WorkflowFanLineException,
  WorkflowVpcStatus,
  Bank
]
