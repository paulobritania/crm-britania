/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { WorkflowPerformed } from '../../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowFan } from './workflowFan.entity'

@Table({
  modelName: 'WorkflowFanPerform',
  tableName: 'workflow_performed_fan',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowFanPerformed extends Model<WorkflowFanPerformed> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowFanPerformed'
  })
  id: number

  @BelongsTo(() => WorkflowPerformed, {
    foreignKey: 'workflowPerformedId',
    targetKey: 'id'
  })
  performed: WorkflowPerformed

  @BelongsTo(() => WorkflowFan, {
    foreignKey: 'workflowFanId',
    targetKey: 'id'
  })
  fan: WorkflowFan
}
