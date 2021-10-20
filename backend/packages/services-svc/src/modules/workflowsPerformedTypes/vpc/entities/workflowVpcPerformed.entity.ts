/* eslint-disable import/no-cycle */
import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

import { WorkflowPerformed } from '../../../workflowsPerformed/entities/workflowsPerformed.entity'
import { WorkflowVpc } from './workflowVpc.entity'

@Table({
  modelName: 'WorkflowVpcPerformed',
  tableName: 'workflow_vpc_performed',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowVpcPerformed extends Model<WorkflowVpcPerformed> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowVpcPerformed'
  })
  id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  workflowVpcId: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  workflowPerformedId: number

  @BelongsTo(() => WorkflowVpc, {
    foreignKey: 'workflowVpcId',
    targetKey: 'id'
  })
  vpc: WorkflowVpc

  @BelongsTo(() => WorkflowPerformed, {
    foreignKey: 'workflowPerformedId',
    targetKey: 'id'
  })
  workflowPerformed: WorkflowPerformed
}
