/* eslint-disable import/no-cycle */
import {
  Table,
  Column,
  DataType,
  Model,
  HasMany,
  BelongsTo
} from 'sequelize-typescript'

import { User } from '../../../users/entities/user.entity'
import { WorkflowPerformed } from '../../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowVpcAttachment } from './workflowVpcAttachments.entity'
import { WorkflowVpcLineFamily } from './workflowVpcLineFamily.entity'
import { WorkflowVpcNd } from './workflowVpcNd.entity'
import { WorkflowVpcPerformed } from './workflowVpcPerformed.entity'
import { WorkflowVpcProduct } from './workflowVpcProduct.entity'
import { WorkflowVpcRequest } from './workflowVpcRequests.entity'
import { WorkflowVpcStatus } from './workflowVpcStatus.entity'

@Table({
  modelName: 'WorkflowVpc',
  tableName: 'workflow_vpc',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false
})
export class WorkflowVpc extends Model<WorkflowVpc> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowVpc'
  })
  id: number

  @Column({
    type: DataType.STRING(14),
    allowNull: true
  })
  cnpj: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  parentCompanyCode: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  parentCompanyName: string

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  companyName: string

  @Column({
    type: DataType.STRING(11),
    allowNull: true
  })
  foundsType: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  trandingNumber: number

  @Column({
    type: DataType.STRING(20),
    allowNull: true
  })
  paymentType: string

  @Column({
    type: DataType.STRING(13),
    allowNull: true
  })
  requestNumber: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  active: boolean

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  deploymentDate: Date

  @Column({
    type: DataType.NUMBER,
    allowNull: true
  })
  value: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  campaignReason: string

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  startDate: Date

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  endDate: Date

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  directorshipCode: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  directorshipDescription: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  approverCode: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  approverDescription: string

  @Column({
    type: DataType.STRING(50),
    allowNull: true
  })
  bank: string

  @Column({
    type: DataType.STRING(10),
    allowNull: true
  })
  bankAgency: string

  @Column({
    type: DataType.STRING(20),
    allowNull: true
  })
  bankAccount: string

  @Column({
    type: DataType.STRING(14),
    allowNull: true
  })
  bankCnpj: string

  @BelongsTo(() => WorkflowPerformed, {
    foreignKey: 'workflowPerformedId',
    targetKey: 'id'
  })
  workflowPerformed: WorkflowPerformed

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  workflowPerformedId: number

  @BelongsTo(() => User, { foreignKey: 'createdBy', targetKey: 'id' })
  userCreated: User

  @BelongsTo(() => User, { foreignKey: 'updatedBy', targetKey: 'id' })
  userUpdated: User

  @HasMany(() => WorkflowVpcLineFamily, {
    sourceKey: 'id',
    foreignKey: 'workflowVpcId'
  })
  linesFamilies: WorkflowVpcLineFamily[]

  @HasMany(() => WorkflowVpcNd, {
    sourceKey: 'id',
    foreignKey: 'workflowVpcId'
  })
  nds: WorkflowVpcNd[]

  @HasMany(() => WorkflowVpcProduct, {
    sourceKey: 'id',
    foreignKey: 'workflowVpcId'
  })
  products: WorkflowVpcProduct[]

  @HasMany(() => WorkflowVpcRequest, {
    sourceKey: 'id',
    foreignKey: 'workflowVpcId'
  })
  requests: WorkflowVpcRequest[]

  @HasMany(() => WorkflowVpcAttachment, {
    sourceKey: 'id',
    foreignKey: 'workflowVpcId'
  })
  attachments: WorkflowVpcAttachment[]

  @HasMany(() => WorkflowVpcPerformed, {
    sourceKey: 'id',
    foreignKey: 'workflowVpcId'
  })
  vpcPerformeds: WorkflowVpcPerformed[]

  @BelongsTo(() => WorkflowVpcStatus, {
    foreignKey: 'statusId',
    targetKey: 'id'
  })
  status: WorkflowVpcStatus
}
