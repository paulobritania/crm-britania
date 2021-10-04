/* eslint-disable import/no-cycle */
import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  HasMany
} from 'sequelize-typescript'

import { File } from '../../../files/entities/file.entity'
import { ClientDocumentBalance } from './clientDocumentBalance.entity'
import { ClientDocumentContractualAlteration } from './clientDocumentContractualAlteration.entity'
import { ClientDocumentGeneral } from './clientDocumentGeneral.entity'
import { ClientDocumentPre } from './clientDocumentPre.entity'
@Table({
  modelName: 'ClientDocument',
  tableName: 'client_document',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class ClientDocument extends Model<ClientDocument> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the ClientDocument'
  })
  id: number

  @BelongsTo(() => File, {
    foreignKey: 'socialContractFileId',
    targetKey: 'id'
  })
  socialContractFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  socialContractFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'registrationFormFileId',
    targetKey: 'id'
  })
  registrationFormFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  registrationFormFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'invoicesFromOtherSuppliersFileId',
    targetKey: 'id'
  })
  invoiceFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  invoicesFromOtherSuppliersFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'billingRatioFileId',
    targetKey: 'id'
  })
  billingRatioFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  billingRatioFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'currentBalanceSheetFileId',
    targetKey: 'id'
  })
  currentBalanceSheetFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  currentBalanceSheetFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'lpIncomeTaxFileId',
    targetKey: 'id'
  })
  lpIncomeTaxFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  lpIncomeTaxFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'fpIncomeTaxFileId',
    targetKey: 'id'
  })
  fpIncomeTaxFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  fpIncomeTaxFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'defisDasnFileId',
    targetKey: 'id'
  })
  defisDasnFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  defisDasnFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'pgdasFileId',
    targetKey: 'id'
  })
  pgdasFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  pgdasFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'holderDocumentFileId',
    targetKey: 'id'
  })
  holderDocumentFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  holderDocumentFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'holderDriverLicenseFileId',
    targetKey: 'id'
  })
  holderDriverLicenseFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  holderDriverLicenseFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'residenceProofFileId',
    targetKey: 'id'
  })
  residenceProofFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  residenceProofFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'specialRegimeLetterStFileId',
    targetKey: 'id'
  })
  specialRegimeLetterStFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  specialRegimeLetterStFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'letterOfTaxationRegimeFileId',
    targetKey: 'id'
  })
  letterOfTaxationRegimeFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  letterOfTaxationRegimeFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'genericConsultationMatoGrossoFileId',
    targetKey: 'id'
  })
  genericConsultationMatoGrossoFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  genericConsultationMatoGrossoFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'nationalSimpleConsultationFileId',
    targetKey: 'id'
  })
  nationalSimpleConsultationFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  nationalSimpleConsultationFileId: number

  @BelongsTo(() => File, {
    foreignKey: 'syntacticQueryFileId',
    targetKey: 'id'
  })
  syntacticQueryFile: File

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  syntacticQueryFileId: number

  @HasMany(() => ClientDocumentPre, {
    foreignKey: 'clientDocumentId',
    sourceKey: 'id'
  })
  pre: ClientDocumentPre[]

  @HasMany(() => ClientDocumentGeneral, {
    foreignKey: 'clientDocumentId',
    sourceKey: 'id'
  })
  general: ClientDocumentGeneral[]

  @HasMany(() => ClientDocumentContractualAlteration, {
    foreignKey: 'clientDocumentId',
    sourceKey: 'id'
  })
  contractualAlteration: ClientDocumentContractualAlteration[]

  @HasMany(() => ClientDocumentBalance, {
    foreignKey: 'clientDocumentId',
    sourceKey: 'id'
  })
  balance: ClientDocumentBalance[]
}
