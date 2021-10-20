import { Table, Column, DataType, Model, BelongsTo } from 'sequelize-typescript'

// eslint-disable-next-line import/no-cycle
import { WorkflowVpc } from './workflowVpc.entity'

@Table({
  modelName: 'WorkflowVpcRequest',
  tableName: 'workflow_vpc_requests',
  underscored: true,
  version: false,
  timestamps: false,
  paranoid: false
})
export class WorkflowVpcRequest extends Model<WorkflowVpcRequest> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    comment: 'The identifier for the workflowvpcrequest'
  })
  id: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  requestNumber: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  establishmentCode: number

  @Column({
    type: DataType.STRING(70),
    allowNull: false
  })
  establishmentName: string

  @Column({
    type: DataType.NUMBER,
    allowNull: false
  })
  value: number

  @BelongsTo(() => WorkflowVpc, {
    foreignKey: 'workflowVpcId',
    targetKey: 'id'
  })
  vpc: WorkflowVpc
}
