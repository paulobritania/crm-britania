import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { WorkflowVpc } from './workflowVpc.entity'

@Table({
  modelName: 'WorkflowVpcLineFamily',
  tableName: 'workflow_vpc_lines_families',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowVpcLineFamily extends Model<WorkflowVpcLineFamily> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: false,
    comment: 'The identifier for the WorkflowVpcLineFamily'
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

  @BelongsTo(() => WorkflowVpc, {
    foreignKey: 'workflowVpcId',
    targetKey: 'id'
  })
  vpc: WorkflowVpc
}
