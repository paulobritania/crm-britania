import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { WorkflowFan } from './workflowFan.entity'

@Table({
  modelName: 'WorkflowFanLineFamily',
  tableName: 'workflow_fan_lines_families',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowFanLineFamily extends Model<WorkflowFanLineFamily> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowFanLineFamily'
  })
  id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  lineCode: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  lineDescription: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  familyCode: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  familyDescription: string

  @BelongsTo(() => WorkflowFan, {
    foreignKey: 'workflowFanId',
    targetKey: 'id'
  })
  fan: WorkflowFan
}
