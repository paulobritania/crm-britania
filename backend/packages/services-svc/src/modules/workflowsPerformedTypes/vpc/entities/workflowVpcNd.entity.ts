import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { WorkflowVpc } from './workflowVpc.entity'

@Table({
  modelName: 'WorkflowVpcNd',
  tableName: 'workflow_vpc_nds',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowVpcNd extends Model<WorkflowVpcNd> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowVpcLineFamily'
  })
  id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  issuerCompanyCode: number

  @Column({
    type: DataType.STRING(70),
    allowNull: false
  })
  issuerCompanyName: string

  @Column({
    type: DataType.STRING(15),
    allowNull: false
  })
  number: string

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  issueDate: Date

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  dueDate: Date

  @Column({
    type: DataType.NUMBER,
    allowNull: false
  })
  value: number

  @Column({
    type: DataType.STRING(12),
    allowNull: false
  })
  company: string

  @Column({
    type: DataType.STRING(500),
    allowNull: false
  })
  observation: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  active: boolean

  @Column({
    type: DataType.STRING(500),
    allowNull: true
  })
  reasonDeactivation: string

  @BelongsTo(() => WorkflowVpc, {
    foreignKey: 'workflowVpcId',
    targetKey: 'id'
  })
  vpc: WorkflowVpc
}
