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
import { WorkflowFanDocument } from './workflowFanDocument.entity'
import { WorkflowFanFamily } from './workflowFanFamily.entity'
import { WorkflowFanFamilyException } from './workflowFanFamilyException.entity'
import { WorkflowFanGoalAchivement } from './workflowFanGoalAchivement.entity'
import { WorkflowFanLine } from './workflowFanLine.entity'
import { WorkflowFanLineException } from './workflowFanLineException.entity'
import { WorkflowFanNegotiatedFund } from './workflowFanNegotiatedFund.entity'
import { WorkflowFanPercentage } from './workflowFanPercentage.entity'
import { WorkflowFanPerformed } from './workflowFanPerformed.entity'

@Table({
  modelName: 'WorkflowFan',
  tableName: 'workflow_fan',
  underscored: true,
  version: false,
  timestamps: true,
  paranoid: false
})
export class WorkflowFan extends Model<WorkflowFan> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowFan'
  })
  id: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  number: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  rev: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  company: string

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
  responsible: string

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  regionalManager: string

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  regionalManagerCode: number

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
    type: DataType.NUMBER,
    allowNull: true
  })
  directorship: number

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  directorshipDescription: string

  @Column({
    type: DataType.STRING(70),
    allowNull: true
  })
  observation: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true
  })
  active: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true
  })
  currentRegister: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true
  })
  lastRegister: boolean

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true
  })
  isAdditive: boolean

  @BelongsTo(() => WorkflowFan, {
    foreignKey: 'workflowFanId',
    targetKey: 'id'
  })
  fan: WorkflowFan

  @BelongsTo(() => WorkflowPerformed, {
    foreignKey: 'workflowPerformedId',
    targetKey: 'id'
  })
  performed: WorkflowPerformed

  workflowPerformedId: number

  @HasMany(() => WorkflowFanLine, {
    sourceKey: 'id',
    foreignKey: 'workflowFanId'
  })
  lines: WorkflowFanLine[]

  @HasMany(() => WorkflowFanFamily, {
    sourceKey: 'id',
    foreignKey: 'workflowFanId'
  })
  families: WorkflowFanFamily[]

  @HasMany(() => WorkflowFanFamilyException, {
    sourceKey: 'id',
    foreignKey: 'workflowFanId'
  })
  familiesExceptions: WorkflowFanFamilyException[]

  @HasMany(() => WorkflowFanLineException, {
    sourceKey: 'id',
    foreignKey: 'workflowFanId'
  })
  linesExceptions: WorkflowFanLineException[]

  @HasMany(() => WorkflowFanGoalAchivement, {
    sourceKey: 'id',
    foreignKey: 'workflowFanId'
  })
  achivements: WorkflowFanGoalAchivement[]

  @HasMany(() => WorkflowFanPercentage, {
    sourceKey: 'id',
    foreignKey: 'workflowFanId'
  })
  percentages: WorkflowFanPercentage[]

  @HasMany(() => WorkflowFanNegotiatedFund, {
    sourceKey: 'id',
    foreignKey: 'workflowFanId'
  })
  negotiatedFunds: WorkflowFanNegotiatedFund[]

  @HasMany(() => WorkflowFanPerformed, {
    sourceKey: 'id',
    foreignKey: 'workflowFanId'
  })
  performeds: WorkflowFanPerformed[]

  @HasMany(() => WorkflowFanDocument, {
    foreignKey: 'workflowFanId',
    sourceKey: 'id'
  })
  documents: WorkflowFanDocument[]

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
}
