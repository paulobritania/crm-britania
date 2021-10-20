import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { WorkflowFan } from './workflowFan.entity'

@Table({
  modelName: 'WorkflowFanFamily',
  tableName: 'workflow_fan_families',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowFanFamily extends Model<WorkflowFanFamily> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowFanFamily'
  })
  id: number

  @Column({
    type: DataType.STRING(70),
    allowNull: false
  })
  code: string

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
