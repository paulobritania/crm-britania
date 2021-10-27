/* eslint-disable import/no-cycle */
import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  HasMany
} from 'sequelize-typescript'

import { User } from '../../../users/entities/user.entity'
import { WorkflowPerformed } from '../../../workflowsPerformed/entities/workflowsPerformed.entity'
import { ClientAdditionalInformation } from './clientAdditionalInformation.entity'
import { ClientCadastralCheck } from './clientCadastralCheck.entity'
import { ClientDocument } from './clientDocument.entity'
import { ClientFinancial } from './clientFinancial.entity'
import { ClientFiscalInformation } from './clientFiscalInformation.entity'
import { ClientFiscalParametrization } from './clientFiscalParametrization.entity'
import { ClientFiscalParametrizationCfop } from './clientFiscalParametrizationCfop.entity'
import { ClientParametrization } from './clientParametrization.entity'
import { ClientPriceList } from './clientPriceList.entity'
import { ClientRegistrationInformation } from './clientRegistrationInformation.entity'
import { WorkflowRegisterClientPerformed } from './workflowClientRegisterPerformed.entity'
@Table({
  modelName: 'WorkflowClientRegister',
  tableName: 'workflow_client_register',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false
})
export class WorkflowClientRegister extends Model<WorkflowClientRegister> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowClientRegister'
  })
  id: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  companyName: string

  @Column({
    type: DataType.STRING(14),
    allowNull: true
  })
  cnpj: string

  @Column({
    type: DataType.STRING(14),
    allowNull: true
  })
  stateRegistration: string

  @Column({
    type: DataType.STRING(14),
    allowNull: true
  })
  suframa: string

  @Column({
    type: DataType.STRING(11),
    allowNull: true
  })
  commercialPhone: string

  @Column({
    type: DataType.STRING(11),
    allowNull: true
  })
  billingPhone: string

  @Column({
    type: DataType.STRING(11),
    allowNull: true
  })
  cellphone: string

  @Column({
    type: DataType.STRING(11),
    allowNull: true
  })
  shoppingPhone: string

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  billingEmail: string

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  invoiceShippingEmail: string

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  businessEmail: string

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  site: string

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  publicPlace: string

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  complement: string

  @Column({
    type: DataType.STRING(10),
    allowNull: true
  })
  number: string

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  district: string

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  city: string

  @Column({
    type: DataType.STRING(40),
    allowNull: true
  })
  country: string

  @Column({
    type: DataType.STRING(2),
    allowNull: true
  })
  state: string

  @Column({
    type: DataType.STRING(2),
    allowNull: true
  })
  zipCode: string

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  parentCompanyName: string

  @Column({
    type: DataType.STRING(14),
    allowNull: true
  })
  parentCompanyCnpj: string

  @BelongsTo(() => ClientAdditionalInformation, {
    foreignKey: 'clientAdditionalInformationId',
    targetKey: 'id'
  })
  additionalInformation: ClientAdditionalInformation

  @BelongsTo(() => ClientCadastralCheck, {
    foreignKey: 'clientCadastralCheckId',
    targetKey: 'id'
  })
  cadastralCheck: ClientCadastralCheck

  @BelongsTo(() => ClientFinancial, {
    foreignKey: 'clientFinancialId',
    targetKey: 'id'
  })
  financial: ClientFinancial

  @BelongsTo(() => ClientFiscalInformation, {
    foreignKey: 'clientFiscalInformationId',
    targetKey: 'id'
  })
  fiscalInformation: ClientFiscalInformation

  @BelongsTo(() => ClientParametrization, {
    foreignKey: 'clientParametrizationId',
    targetKey: 'id'
  })
  parametrization: ClientParametrization

  @BelongsTo(() => ClientFiscalParametrization, {
    foreignKey: 'clientFiscalParametrizationId',
    targetKey: 'id'
  })
  fiscalParametrization: ClientFiscalParametrization

  @BelongsTo(() => ClientRegistrationInformation, {
    foreignKey: 'clientRegistrationInformationId',
    targetKey: 'id'
  })
  registrationInformation: ClientRegistrationInformation

  @BelongsTo(() => ClientDocument, {
    foreignKey: 'clientFiscalDocumentId',
    targetKey: 'id'
  })
  documents: ClientDocument

  @BelongsTo(() => ClientFiscalParametrizationCfop, {
    foreignKey: 'clientFiscalParametrizationCfopId',
    targetKey: 'id'
  })
  cfop: ClientFiscalParametrizationCfop

  @BelongsTo(() => ClientPriceList, {
    foreignKey: 'clientPriceListId',
    targetKey: 'id'
  })
  priceList: ClientPriceList

  @BelongsTo(() => User, {
    foreignKey: 'updatedBy',
    targetKey: 'id'
  })
  updatedByUser: User

  @BelongsTo(() => User, {
    foreignKey: 'createdBy',
    targetKey: 'id'
  })
  createdByUser: User

  @HasMany(() => WorkflowRegisterClientPerformed, {
    foreignKey: 'workflowRegisterClientId',
    sourceKey: 'id'
  })
  clientPerformeds: WorkflowRegisterClientPerformed[]

  @BelongsTo(() => WorkflowPerformed, {
    foreignKey: 'workflowPerformedId',
    targetKey: 'id'
  })
  performed: WorkflowPerformed

  workflowPerformedId: number
}
