import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { WorkflowFan } from './workflowFan.entity'

@Table({
  modelName: 'WorkflowFanLineException',
  tableName: 'workflow_fan_lines_exceptions',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowFanLineException extends Model<WorkflowFanLineException> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowLineException'
  })
  id: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  code: number

  @BelongsTo(() => WorkflowFan, {
    foreignKey: 'workflowFanId',
    targetKey: 'id'
  })
  fan: WorkflowFan
}
