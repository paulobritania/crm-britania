import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'

import { WorkflowPerformed } from '../../../workflowsPerformed/entities/workflowsPerformed.entity'
// eslint-disable-next-line import/no-cycle
import { WorkflowRepresentativeRegistration } from './workflowRepresentativeRegistration.entity'

@Table({
  modelName: 'WorkflowRepresentativeRegistrationPerformed',
  tableName: 'workflow_representative_registration_performed',
  underscored: true,
  version: false,
  timestamps: false
})
export class WorkflowRepresentativeRegistrationPerformed extends Model<WorkflowRepresentativeRegistrationPerformed> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment:
      'The identifier for the workflowRepresentativeRegistrationPerformed record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  representativeRegistrationId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  performedId: number

  @BelongsTo(() => WorkflowRepresentativeRegistration, {
    foreignKey: 'representativeRegistrationId',
    targetKey: 'id'
  })
  workflowRepresentativeRegistration: WorkflowRepresentativeRegistration

  @BelongsTo(() => WorkflowPerformed, {
    foreignKey: 'performedId',
    targetKey: 'id'
  })
  workflowPerformed: WorkflowPerformed
}
