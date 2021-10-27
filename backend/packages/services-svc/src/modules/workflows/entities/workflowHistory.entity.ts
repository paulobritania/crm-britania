/* eslint-disable import/no-cycle */
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'

import { Workflow } from './workflow.entity'

@Table({
  modelName: 'WorkflowHistory',
  tableName: 'workflow_histories',
  underscored: true,
  version: false,
  timestamps: false
})
export class WorkflowHistory extends Model<WorkflowHistory> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflow record'
  })
  workflowId: number

  @Column({
    allowNull: false,
    type: DataType.STRING(500)
  })
  updatedFields: string

  @HasOne(() => Workflow, { sourceKey: 'workflowId', foreignKey: 'id' })
  workflow: Workflow
}
