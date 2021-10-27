/* eslint-disable import/no-cycle */
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'

import { User } from '../../users/entities/user.entity'
import { WorkflowTaskResponse } from '../../workflows/entities/workflowTaskResponse.entity'
import { WorkflowPerformed } from './workflowsPerformed.entity'

@Table({
  modelName: 'WorkflowPerformedResponse',
  tableName: 'workflow_performed_responses',
  underscored: true,
  version: false,
  timestamps: false
})
export class WorkflowPerformedResponse extends Model<WorkflowPerformedResponse> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflow performed response record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowPerformedId: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowTaskResponseId: number

  @Column({
    allowNull: true,
    type: DataType.STRING(100)
  })
  justification: string

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

  @HasOne(() => WorkflowPerformed, {
    sourceKey: 'workflowPerformedId',
    foreignKey: 'id'
  })
  workflowPerformed: WorkflowPerformed

  @HasOne(() => WorkflowTaskResponse, {
    sourceKey: 'workflowTaskResponseId',
    foreignKey: 'id'
  })
  workflowTaskResponse: WorkflowTaskResponse

  @HasOne(() => User, { sourceKey: 'createdBy', foreignKey: 'id' })
  createdByUser: User
}
