import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { WorkflowFan } from './workflowFan.entity'

@Table({
  modelName: 'WorkflowFanGoalAchivement',
  tableName: 'workflow_fan_goal_achivements',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowFanGoalAchivement extends Model<WorkflowFanGoalAchivement> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowFanGoalAchivement'
  })
  id: number

  @Column({
    type: DataType.NUMBER,
    allowNull: false
  })
  startPercentage: number

  @Column({
    type: DataType.NUMBER,
    allowNull: false
  })
  endPercentage: number

  @Column({
    type: DataType.NUMBER,
    allowNull: false
  })
  bonus: number

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  basisOfCalculation: string

  @Column({
    type: DataType.STRING(30),
    allowNull: false
  })
  determinationBasis: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  slaughterReturn: boolean

  @Column({
    type: DataType.STRING(3),
    allowNull: false
  })
  periodicity: string

  @BelongsTo(() => WorkflowFan, {
    foreignKey: 'workflowFanId',
    targetKey: 'id'
  })
  fan: WorkflowFan
}
