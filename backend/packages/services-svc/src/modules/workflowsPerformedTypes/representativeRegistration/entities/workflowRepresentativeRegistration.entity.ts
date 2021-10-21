/* eslint-disable import/no-cycle */
import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table
} from 'sequelize-typescript'

import { Address } from '../../../address/entities/address.entity'
import { User } from '../../../users/entities/user.entity'
import { WorkflowPerformed } from '../../../workflowsPerformed/entities/workflowsPerformed.entity'
import { RepresentativeBankData } from './representativeBankData.entity'
import { RepresentativeCommissionPercentage } from './representativeCommissionPercentage.entity'
import { RepresentativeDocument } from './representativeDocument.entity'
import { RepresentativeFinancial } from './representativeFinancial.entity'
import { RepresentativeMaintenance } from './representativeMaintenance.entity'
import { WorkflowRepresentativeRegistrationPerformed } from './worfklowRepresentativeRegistrationPerformed.entity'

@Table({
  modelName: 'WorkflowRepresentativeRegistration',
  tableName: 'workflow_representative_registration',
  underscored: true,
  version: false,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class WorkflowRepresentativeRegistration extends Model<WorkflowRepresentativeRegistration> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment:
      'The identifier for the workflow representative registration record'
  })
  id: number

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  companyName: string

  @Column({
    allowNull: false,
    type: DataType.STRING(14)
  })
  cnpj: string

  @Column({
    allowNull: true,
    type: DataType.STRING(30)
  })
  contactName: string

  @Column({
    allowNull: true,
    type: DataType.STRING(14)
  })
  stateRegistration: string

  @Column({
    allowNull: true,
    type: DataType.STRING(14)
  })
  suframa: string

  @Column({
    allowNull: true,
    type: DataType.STRING(11)
  })
  commercialPhone: string

  @Column({
    allowNull: true,
    type: DataType.STRING(11)
  })
  billingPhone: string

  @Column({
    allowNull: true,
    type: DataType.STRING(12)
  })
  cellphone: string

  @Column({
    allowNull: true,
    type: DataType.STRING(40)
  })
  email: string

  @Column({
    allowNull: true,
    type: DataType.STRING(40)
  })
  site: string

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  addressId: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  representativeBankDataId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  representativeFinancialId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  representativeMaintenanceId: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  workflowPerformedId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  createdBy: number

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  updatedBy: number

  @HasOne(() => Address, {
    sourceKey: 'addressId',
    foreignKey: 'id'
  })
  address: Address

  @HasOne(() => RepresentativeBankData, {
    sourceKey: 'representativeBankDataId',
    foreignKey: 'id'
  })
  bankData: RepresentativeBankData

  @HasOne(() => RepresentativeFinancial, {
    sourceKey: 'representativeFinancialId',
    foreignKey: 'id'
  })
  financial: RepresentativeFinancial

  @HasOne(() => RepresentativeMaintenance, {
    sourceKey: 'representativeMaintenanceId',
    foreignKey: 'id'
  })
  maintenance: RepresentativeMaintenance

  @HasOne(() => WorkflowPerformed, {
    sourceKey: 'workflowPerformedId',
    foreignKey: 'id'
  })
  workflowPerformed: WorkflowPerformed

  @HasOne(() => User, {
    sourceKey: 'createdBy',
    foreignKey: 'id'
  })
  createdByUser: User

  @HasOne(() => User, {
    sourceKey: 'updatedBy',
    foreignKey: 'id'
  })
  updatedByUser: User

  @HasMany(() => RepresentativeDocument, {
    sourceKey: 'id',
    foreignKey: 'workflowRepresentativeRegistrationId'
  })
  documents: RepresentativeDocument[]

  @HasMany(() => RepresentativeCommissionPercentage, {
    sourceKey: 'id',
    foreignKey: 'workflow_representative_registration_id'
  })
  commissionPercentage: RepresentativeCommissionPercentage[]

  @HasMany(() => WorkflowRepresentativeRegistrationPerformed, {
    sourceKey: 'id',
    foreignKey: 'representativeRegistrationId'
  })
  representativePerformeds: WorkflowRepresentativeRegistrationPerformed[]
}
