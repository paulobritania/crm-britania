import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { WorkflowFan } from './workflowFan.entity'

@Table({
  modelName: 'WorkflowFanLine',
  tableName: 'workflow_fan_lines',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowFanLine extends Model<WorkflowFanLine> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowFanLine'
  })
  id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  code: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string

  @BelongsTo(() => WorkflowFan, {
    foreignKey: 'workflowFanId',
    targetKey: 'id'
  })
  fan: WorkflowFan
}
