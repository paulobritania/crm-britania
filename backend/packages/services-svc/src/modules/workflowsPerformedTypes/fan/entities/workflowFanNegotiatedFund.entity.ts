import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { WorkflowFan } from './workflowFan.entity'

@Table({
  modelName: 'WorkflowFanNegotiatedFund',
  tableName: 'workflow_fan_negotiated_funds',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowFanNegotiatedFund extends Model<WorkflowFanNegotiatedFund> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowFanNegotiatedFund'
  })
  id: number

  @Column({
    type: DataType.NUMBER,
    allowNull: false
  })
  value: number

  @Column({
    type: DataType.STRING(70),
    allowNull: false
  })
  description: string

  @Column({
    type: DataType.STRING(70),
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
  determinationBasis: string

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  basisOfCalculation: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  slaughterReturn: boolean

  @BelongsTo(() => WorkflowFan, {
    foreignKey: 'workflowFanId',
    targetKey: 'id'
  })
  fan: WorkflowFan
}
