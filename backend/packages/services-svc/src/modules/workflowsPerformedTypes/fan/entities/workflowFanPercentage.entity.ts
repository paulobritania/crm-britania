import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { WorkflowFan } from './workflowFan.entity'

@Table({
  modelName: 'WorkflowFanPercentage',
  tableName: 'workflow_fan_percentages',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowFanPercentage extends Model<WorkflowFanPercentage> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowPercentage'
  })
  id: number

  @Column({
    type: DataType.NUMBER,
    allowNull: false
  })
  percentage: number

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  determinationBasis: string

  @Column({
    type: DataType.STRING(70),
    allowNull: false
  })
  budgetDescription: string

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  periodicity: string

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  discount: string

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  basisOfCalculation: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  slaughterReturn: boolean

  @BelongsTo(() => WorkflowFan, {
    foreignKey: 'workflowFanId',
    targetKey: 'id'
  })
  fan: WorkflowFan
}
