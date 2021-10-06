/* eslint-disable import/no-cycle */
import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'

import { WorkflowTask } from './workflowTask.entity'
@Table({
  modelName: 'WorkflowTaskResponse',
  tableName: 'workflow_task_responses',
  underscored: true,
  version: false,
  indexes: [
    {
      unique: true,
      fields: ['workflow_task_id', 'order']
    }
  ]
})
export class WorkflowTaskResponse extends Model<WorkflowTaskResponse> {
  @Column({
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the response record'
  })
  id: number

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  workflowTaskId: number

  @Column({
    allowNull: false,
    type: DataType.STRING(50)
  })
  title: string

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  order: number

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN
  })
  requiresJustification: boolean

  @Column({
    allowNull: true,
    type: DataType.INTEGER
  })
  nextTaskOrder: number

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN
  })
  finishWorkflowSuccessfully: boolean

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN
  })
  finishWorkflowWithError: boolean

  @HasOne(() => WorkflowTask, { sourceKey: 'workflowTaskId', foreignKey: 'id' })
  task: WorkflowTask
}
