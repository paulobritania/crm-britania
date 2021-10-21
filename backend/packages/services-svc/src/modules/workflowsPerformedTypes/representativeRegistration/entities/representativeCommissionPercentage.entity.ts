/* eslint-disable import/no-cycle */
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'

import { WorkflowRepresentativeRegistration } from './workflowRepresentativeRegistration.entity'

@Table({
  modelName: 'representativeCommissionPercentage',
  tableName: 'representative_commission_percentage',
  underscored: true,
  version: false,
  timestamps: false
})
export class RepresentativeCommissionPercentage extends Model<RepresentativeCommissionPercentage> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment:
      'The identifier for the representative commission percentage record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowRepresentativeRegistrationId: number

  @Column({
    allowNull: true,
    type: DataType.STRING(5)
  })
  establishmentCode: string

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  establishmentDescription: string

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  lineCode: number

  @Column({
    allowNull: true,
    type: DataType.STRING(70)
  })
  lineDescription: string

  @Column({
    allowNull: true,
    type: DataType.DECIMAL(8, 3)
  })
  commissionPercentage: number

  @HasOne(() => WorkflowRepresentativeRegistration, {
    sourceKey: 'workflowRepresentativeRegistrationId',
    foreignKey: 'id'
  })
  workflowRepresentativeRegistration: WorkflowRepresentativeRegistration
}
