import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'

import { User } from '../../../users/entities/user.entity'
import { WorkflowPerformed } from '../../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowClientUpdateAddress } from './workflowClientUpdateAddress.entity'
@Table({
  modelName: 'WorkflowClientUpdate',
  tableName: 'workflow_client_update',
  underscored: true,
  version: false,
  timestamps: false
})
export class WorkflowClientUpdate extends Model<WorkflowClientUpdate> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflow client update record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  clientTotvsCode: number

  @Column({
    allowNull: false,
    type: DataType.STRING(11)
  })
  commercialPhone: string

  @Column({
    allowNull: true,
    type: DataType.STRING(11)
  })
  cellPhone: string

  @Column({
    allowNull: true,
    type: DataType.STRING(40)
  })
  logisticsInformation: string

  @Column({
    allowNull: true,
    type: DataType.STRING(40)
  })
  creditSituation: string

  @Column({
    allowNull: true,
    type: DataType.STRING(40)
  })
  regimeLetter: string

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  daysWithoutBilling: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  deliveryAddressId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  billingAddressId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowPerformedId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  createdBy: number

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  createdAt: string

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  updatedBy: number

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  updatedAt: string

  @HasOne(() => WorkflowClientUpdateAddress, {
    sourceKey: 'deliveryAddressId',
    foreignKey: 'id'
  })
  deliveryAddress: WorkflowClientUpdateAddress

  @HasOne(() => WorkflowClientUpdateAddress, {
    sourceKey: 'billingAddressId',
    foreignKey: 'id'
  })
  billingAddress: WorkflowClientUpdateAddress

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
}
