import { Table, Column, DataType, Model } from 'sequelize-typescript'

@Table({
  modelName: 'WorkflowVpcStatus',
  tableName: 'workflow_vpc_status',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowVpcStatus extends Model<WorkflowVpcStatus> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the WorkflowVpcStatus'
  })
  id: number

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string
}
